import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const authHeaders = req.headers['authorization'];
    if(!authHeaders){
        return res.sendStatus(401);
    }
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err,decoded)=>{
            if(err) return res.sendStatus(403);
            next();
        }
    )
}