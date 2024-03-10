import express from 'express';
import {spawn} from 'child_process';
import { User } from '../model/User';
import { Doctor } from '../model/Doctor';
import { Report } from '../model/Report';

export const userRouter = express.Router();
 

let predict = (query:string) => {
    return new Promise((resolve, reject) => {
        let dataFromPython:string;
        const childpython = spawn('python', ['./src/ML_Model/python.py', query])
        childpython.stdout.on('data', (data) => {
            dataFromPython = data.toString();
            console.log(`stdout: ${data}`);
        }),
            childpython.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`)
            })
        childpython.on('exit', (data) => {
            resolve(dataFromPython);
        })
    })
}

userRouter.post('/predict',async (req,res)=>{
    const user = await User.findById(req.body.id).select("age gender");
    if(!user){
        return res.status(404).json({message:"No user found"});
    }
    req.body.data.splice(0,0,user.gender)
    req.body.data.splice(1,0,user.age)
    let x = await predict(JSON.stringify(req.body.data));
    let report = await Report.create({
        gender:req.body.data[0],
        age:req.body.data[1],
        chestPainType:req.body.data[2],
        restingBloodPressure:req.body.data[3],
        cholesterol:req.body.data[4],
        fastingBloodPressure:req.body.data[5],
        restECG:req.body.data[6],
        thalachHeartRate:req.body.data[7],
        exerciseInducedAngina:req.body.data[8],
        oldPeak:req.body.data[9],
        slope:req.body.data[10],
        ca:req.body.data[11],
        thallium:req.body.data[12],
        prediction:x,
        user:req.body.id
    })
    const doctors = await Doctor.find({}).select("_id patients");
    if(doctors.length===0) return res.status(404).json({message:"No Doctors present"});
    doctors.sort((a,b)=>a.patients.length-b.patients.length);
    const assignedDoctor = doctors[0];
    user.doctor = assignedDoctor._id;
    report.doctor = assignedDoctor._id;
    await user.save();
    await report.save();
    await Doctor.findByIdAndUpdate(assignedDoctor._id,{$addToSet:{patients:user._id}});
    res.status(200).json({message:"Your report is ready. A concerned Doctor will be contacting you very soon"});
})
