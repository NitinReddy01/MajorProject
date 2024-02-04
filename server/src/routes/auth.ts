import express from "express";
import { z } from "zod";
import { User } from "../model/User";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import verificationMail from "../services/mailService";
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const signupBody = z.strictObject({
    email:z.string().email(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string()
})

const signinBody = z.strictObject({
    email:z.string().email(),
    password:z.string()
})

authRouter.post('/signin',async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success) return res.status(400).json({message:"Invalid Inputs"});
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({message:'No User found'});
        }
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json({message:"Invalid Credetials"})
        }
        if(!user.emailVerified){
            return res.status(401).json({message:"Please verify your email"});
        }
        const accessToken = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET!,{expiresIn:'1d'});
        const refreshToken = jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'3d'});
        user.refreshToken=refreshToken;
        await user.save();
        res.cookie("token",refreshToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:24 * 60 * 60 * 1000});
        res.status(200).json({accessToken,id:user._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

authRouter.post('/signup',async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success) return res.status(400).json({message:"Invalid Inputs"});
    try{
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser && existingUser.emailVerified){
            return res.status(409).json({message:"User already exists with that username"});
        } 
        if(existingUser && !existingUser.emailVerified){
            await User.deleteOne({email:existingUser.email});
        }
        const hashedPass = await bcrypt.hash(req.body.password,10);
        const code = crypto.randomBytes(16).toString('hex');
        await User.create({
            email:req.body.email,
            password:hashedPass,
            emailVerificationCode:code,
            firstname:req.body.firstname,
            lastname:req.body.lastname
        })
        const link = `http://localhost:3000/verify?email=${req.body.email}&code=${code}`;
        const html = `<p> Click <a href=${link} >here</a> to verify </p>`;
        const result = await verificationMail(req.body.email,html);
        if(!result.success){
            return res.status(500).json({message:"Unable to Send mail Try again later"});
        }
        res.status(200).json({message:"Please Check your mail for verfication"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
})

authRouter.get('/verifyEmail/:email/:code',async (req,res)=>{
    const {email,code} = req.params;
    if(!email || !code){
        return res.status(400).json({message:"Missing email or code"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"No User found"});
    }
    if(code !== user.emailVerificationCode){
        return res.status(401).json({message:"Verification Failed"});
    }
    user.emailVerified=true;
    user.emailVerificationCode="";
    await user.save();
    return res.status(200).json({message:"Email Verified"});
})

export default authRouter;