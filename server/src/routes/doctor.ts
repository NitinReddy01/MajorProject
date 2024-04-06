import { Router } from "express";
import { User } from "../model/User";
import { Report } from "../model/Report";
import { Doctor } from "../model/Doctor";

const doctorRouter = Router();

doctorRouter.get('/all-patients/:id',async (req,res)=>{
    const id:string = req.params.id;
    if(!id) {
        return res.sendStatus(400);
    }
    try {
        const patients = await User.find({ doctor: { $in: [id] } }).select("firstname lastname");
        res.json({patients});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

doctorRouter.get('/patient-details/:id', async (req,res)=>{
    const id:string = req.params.id;
    if(!id) {
        return res.sendStatus(400);
    }
    try {
        const patient = await User.findById(id).select("firstname lastname age gender");
        const reports = await Report.find({user:id}).select("updatedAt doctorReview");
        res.json({patient,reports});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

doctorRouter.get('/doctor-details/:id',async (req,res)=>{
    const id:string = req.params.id;
    if(!id) return res.status(400).json({message:"Doctor id required"});
    try {
        const user = await Doctor.findById(id).select("email firstname lastname age gender");
        if(!user) {
            return res.status(404).json({message:"No user found"});
        }
        res.send({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default doctorRouter;