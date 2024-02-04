import nodemailer from 'nodemailer';

const verificationMail = (email:string,message:string)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASSWORD
        }
    });
    const response = transporter.sendMail({
        from:process.env.MAIL,
        to:email,
        subject:'Email Verification',
        html:message
    }).then((info)=>{return {info,success:true}}).catch((err)=>{return {err,success:false}});
    return response
};

export default verificationMail;