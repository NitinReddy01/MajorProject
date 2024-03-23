import { Router } from "express";
import { Feedback } from "../model/Feedback";
import { Report } from "../model/Report";

const feedbackRouter = Router();

feedbackRouter.post('/add-feedback',async (req,res)=>{
    const {userId,reportId,doctorId,feedBack} = req.body;
    try {
        const report = await Report.findById(reportId);
        report!.doctorReview = true;
        await report!.save();
        await Feedback.create({
            user:userId,
            report:reportId,
            doctor:doctorId,
            feedback:feedBack
        })
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default feedbackRouter;