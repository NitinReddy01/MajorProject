import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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
        default:false
    },
    emailVerificationCode:{
        type:String,
        trim:true
    }
})

export const User = mongoose.model('User',userSchema);