import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    refreshToken:{
        type:String,
        trim:true
    },
    emailVerified:{
        type:Boolean,
        default:true
    },
    emailVerificationCode:{
        type:String,
        default:""
    },
    userType:{
        type:String,
        default:"admin"
    }
})

export const Admin = mongoose.model('Admin',adminSchema);