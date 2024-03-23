import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name : {type:String},
  age: { type: Number, required: true },
  gender: { type: Number, required: true },
  chestPainType: { type: Number, required: true },
  restingBloodPressure: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  fastingBloodPressure: { type: Number, required: true },
  restECG: { type: Number, required: true },
  thalachHeartRate: { type: Number, required: true },
  thallium: { type: Number, required: true },
  slope: { type: Number, required: true },
  ca: { type: Number, required: true },
  oldPeak: { type: Number, required: true },
  exerciseInducedAngina: { type: Number, required: true },
  prediction: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  doctorReview : {type:Boolean,default:false}
},{timestamps:true});

export const Report = mongoose.model("Report", reportSchema);
