import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        trim:true
    },
    city:{
        type:String,
        trim:true
    },
    state:{
        type:String,
        trim:true
    }
})

const doctorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    hospitalName:{
        type:String,
        trim:true,
        required:true
    },
    specialization:{
        type:String,
        trim:true,
        required:true
    },
    hospital:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Hospital'  
    },
    refreshToken:{
        type:String,
        trim:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationCode:{
        type:String,
        trim:true
    },
    userType:{
        type:String,
        default:"doctor"
    },
    patients:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

export const Doctor = mongoose.model('Doctor',doctorSchema);
export const Hospital = mongoose.model('Hospital',hospitalSchema);