import express from 'express';
import {spawn} from 'child_process';
import { User } from '../model/User';

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
    req.body.data.splice(0,0,44)
    // req.body.data.splice(0,0,user.gender)
    // req.body.data.splice(1,0,user.age)
    req.body.data.splice(1,0,1)
    let x = await predict(JSON.stringify(req.body.data));
    res.status(200).json(x);
})
