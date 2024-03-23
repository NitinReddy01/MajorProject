import mongoose from "mongoose";


const feedBackSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref: "User",required:true  },
    doctor : {type:mongoose.Schema.Types.ObjectId, ref: "Doctor",required:true },
    report : { type:mongoose.Schema.Types.ObjectId, ref : 'Report',required:true },
    feedback : {type:String,required:true}
})

export const Feedback = mongoose.model('Feedback',feedBackSchema);