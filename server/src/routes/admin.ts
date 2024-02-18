import express from 'express';
import { z } from 'zod';
import { Admin } from '../model/Admin';
export const adminRouter = express.Router();
import bcrypt from 'bcrypt';

const adminSignupBody = z.strictObject({
    email:z.string().email(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string(),
});

adminRouter.post('/add-admin',async (req,res)=>{
    const {success} = adminSignupBody.safeParse(req.body);
    if(!success) return res.status(400).json({message:"Invalid Inputs"});
    try {
        const existingAdmin = await Admin.findOne({email:req.body.email});
        if(existingAdmin){
            return res.status(409).json({message:"User already exists with that username"});
        }
        const hashedPass = await bcrypt.hash(req.body.password,10);
        await Admin.create({
            email:req.body.email,
            password:hashedPass,
            firstname:req.body.firstname,
            lastname:req.body.lastname
        })
        res.status(200).json({message:"Admin Created"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

adminRouter.post('/add-doctor');

