import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'omiomeromi11@gmail.com',
        pass:process.env.EMAIL_PASS
    }
})

export const sendMail =async({to,subject,text}:{to:string,subject:string,text:string})=>{

    await transporter.sendMail({
        from:"ProConnect",
        to,
        subject,
        text
    })

}