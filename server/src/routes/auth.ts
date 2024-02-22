import express from "express";
import { z } from "zod";
import { User } from "../model/User";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import verificationMail from "../services/mailService";
import jwt from 'jsonwebtoken';
import { Doctor } from "../model/Doctor";
import { Admin } from "../model/Admin";

const authRouter = express.Router();

const userSignupBody = z.strictObject({
    email: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
});

const doctorSignUpBody = z.strictObject({
    email: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    hospitalName: z.string(),
    specialization: z.string()
})

const signinBody = z.strictObject({
    email: z.string().email(),
    password: z.string(),
    role: z.string()
});

export const findEmail = async (email: string) => {
    let existingUser = await User.findOne({ email });
    let existingDoctor = await Doctor.findOne({ email });
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return existingAdmin;
    if (existingDoctor) return existingDoctor;
    if (existingUser) return existingUser;
    return "";
}

authRouter.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid Inputs" });
    console.log(req.body.role);
    try {
        let user;
        switch (req.body.role.toLowerCase()) {
            case 'user':
                user = await User.findOne({ email: req.body.email });
                break;
            case 'doctor':
                user = await Doctor.findOne({ email: req.body.email });
                break;
            case 'admin':
                user = await Admin.findOne({ email: req.body.email });
                break;
            default:
                break;
        }
        if (!user) {
            return res.status(404).json({ message: "No User found" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Credetials" })
        }
        if (!user.emailVerified) {
            return res.status(401).json({ message: "Please verify your email" });
        }
        const accessToken = jwt.sign({ id: user._id, role: req.body.role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ id: user._id, role: req.body.role }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '3d' });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("token", refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken, id: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

authRouter.post('/doctor-signup', async (req, res) => {
    const { success } = doctorSignUpBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid Inputs" });
    try {
        const existingUser = await findEmail(req.body.email);
        if (existingUser && existingUser.emailVerified) {
            return res.status(409).json({ message: "User already exists with that username" })
        }
        if (existingUser && !existingUser.emailVerified) {
            await User.deleteOne({ email: existingUser.email });
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const code = crypto.randomBytes(16).toString('hex');
        await Doctor.create({
            email: req.body.email,
            password: hashedPass,
            emailVerificationCode: code,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            hospitalName: req.body.hospitalName,
            specialization: req.body.specialization
        })
        const link = `http://localhost:3000/verify?email=${req.body.email}&code=${code}`;
        const html = `<p> Click <a href=${link} >here</a> to verify </p>`;
        const result = await verificationMail(req.body.email, html);
        if (!result.success) {
            return res.status(500).json({ message: "Unable to verify mail,please try again later" });
        }
        res.status(200).json({ message: "Please Check your mail for verfication" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

authRouter.post('/user-signup', async (req, res) => {
    const { success } = userSignupBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid Inputs" });
    try {
        const existingUser = await findEmail(req.body.email);
        if (existingUser && existingUser.emailVerified) {
            return res.status(409).json({ message: "User already exists with that username" });
        }
        if (existingUser && !existingUser.emailVerified) {
            await User.deleteOne({ email: existingUser.email });
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const code = await crypto.randomBytes(16).toString('hex');
        await User.create({
            email: req.body.email,
            password: hashedPass,
            emailVerificationCode: code,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        const link = `http://localhost:5173/verify?email=${req.body.email}&code=${code}`;
        const html = `<p> Click <a href=${link} >here</a> to verify </p>`;
        const result = await verificationMail(req.body.email, html);
        if (!result.success) {
            return res.status(500).json({ message: "Unable to Send mail Try again later" });
        }
        res.status(200).json({ message: "Please Check your mail for verfication" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

authRouter.get('/verifyEmail/:email/:code', async (req, res) => {
    const { email, code } = req.params;
    if (!email || !code) {
        return res.status(400).json({ message: "Missing email or code" });
    }
    const user = await findEmail(email);
    if (!user) {
        return res.status(404).json({ message: "No User found" });
    }
    if (!user.emailVerified && code !== user.emailVerificationCode) {
        return res.status(401).json({ message: "Verification Failed" });
    }
    user.emailVerified = true;
    user.emailVerificationCode = "";
    await user.save();
    if (user.userType === "doctor") {
        const link = `http://localhost:3000/verify?doctor=${user.email}`;
        const html = `<p> Click <a href=${link} >here</a> to verify </p>`;
        const result = await verificationMail(req.body.email, html);
        if (!result.success) {
            return res.status(500).json({ message: "Something went wrong please try again later" });
        }
    }
    return res.status(200).json({ message: "Email Verified. You can close this page and login" });
});

// authRouter.get('/refresh-token', async (req, res) => {
//     const token = req.cookies?.jwt;
//     if (!token) {
//         return res.sendStatus(401);
//     }
//     const decode = jwt.decode(token) as jwt.JwtPayload;
//     let role: string = decode?.role;
//     try {
//         let user:Document ; 
//         switch (role) {
//             case 'user':
//                 user = await User.findOne({ refreshToken: token });
//                 break;
//             case 'doctor':
//                 user = await Doctor.findOne({ refreshToken: token });

//                 break;
//             case 'admin':
//                 user = await Admin.findOne({ refreshToken: token });
//                 break;
//             default:
//                 break;
//         }
//         if (!user) return res.sendStatus(403);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }

// })

export default authRouter;