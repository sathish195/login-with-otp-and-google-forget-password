import { Router, Request, Response } from 'express'
import Users from '../db/models/Users'
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { Op } from 'sequelize';
import Otp from '../db/models/Otp';
import nodemailer from 'nodemailer';
var axios = require('axios');

//   nodemaler cradationsls evi
//ok
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:"sathish.d@techallylabs.com" ,
        pass: "xfjj smyg ahvv hzoj"
    },
    tls:{
        rejectUnauthorized:false 
    }
})



const authRoute = Router()


authRoute.post('/signup', async (req: Request, res: Response) => {
    try {
        const reqData = req.body

        const user_name = reqData.user_name
        if (user_name.length === 0 || !user_name) {
            return res.status(400).send({ message: "Please Enter the user name" })
        }

        const email = reqData.email
        if (email.length === 0 || !email) {
            return res.status(400).send({ message: "Please Enter the Email" })
        }
        const phone_number = reqData.phone_number
        if (phone_number.length === 0 || !phone_number) {
            return res.status(400).send({ message: "Please Enter the MobileNumber" })

        }
        const password = reqData.password
        if (password.length === 0 || !password) {
            return res.status(400).send({ message: "Please Enter the Password" })
        }

        const findUser = await Users.count({ where: { [Op.or]: [{ email: req.body.email }, { phone_number: req.body.phone_number }] } })

        if (!(findUser === 0)) {
            return res.status(500).send({ message: "User already exists" })
        }
        //add new user and return 201
        const salt = await bcrypt.genSalt(10);

        const userCredential : any = {
            user_name: user_name,
            email: email,
            phone_number: phone_number,
            password_hashed: await bcrypt.hash(password, salt),
            user_type: 3
        }
        const createUser:any = await Users.create(userCredential)
        return res.status(200).send({ message: "User successfully created" })

    } catch (error: any) {
        return res.send({
            message: error.message
        })
    }
})

authRoute.post('/login', async (req: Request, res: Response) => {
    try {
        const reqData = req.body
        if (!reqData.password || reqData.password.length === 0) {
            return res.status(400).send({
                message: "Please enter a password"
            })
        }
        else if (!reqData.email || reqData.email.length === 0) {
            return res.status(500).send({ message: "Please enter a Email" })
        }
        // chekuser or Not
        const chekUser = await Users.findOne({ where: { email: reqData.email } })
        if (!chekUser) {
            return res.status(500).send({
                message: "enter valid email"
            })
        }
        const password_valid = await bcrypt.compare(req.body.password, chekUser.password_hashed);
        if (!password_valid) {
            return res.status(500).send({
                message: "enter valid password"
            })
        }
        if ((password_valid) && (chekUser.email === reqData.email)) {
            if (chekUser?.user_type == 1 || chekUser?.user_type == 2) {
                let token = jwt.sign(
                    { id: chekUser?.id, username: chekUser.user_name, email: chekUser.email, user_type: chekUser?.user_type, phone_number: chekUser.phone_number },

                    "SECRET_ACCESS_KEY",
                    { expiresIn: "1h" }
                );
                return res.send({
                    message: "success", token: token
                })
            }

            let token = jwt.sign(
                { id: chekUser?.id, username: chekUser.user_name, email: chekUser.email, phone_number: chekUser.phone_number },

                "SECRET_ACCESS_KEY",
                { expiresIn: "1h" }
            );
            return res.send({
                message: "success", token: token
            })
        }

    }
    catch (error: any) {
        return res.send({
            message: error.message
        })
    }
})

//login with otp
// authRoute.post('/login-otp', async (req: Request, res: Response) => {
//     try {
//         //get phone number from req body
//         const phoneNumber = req.body.phone_number
//         // check the user exsists or not 
//         const checkUser: any = await Users.findOne({ where: { phone_number: phoneNumber } })
//         if (!checkUser) {
//             return res.status(404).send({ message: "User not found" })
//         }
//         const otp = Math.floor(1000 + Math.random() * 9000);
//         const response = await axios.post('https://2factor.in/API/V1/' + process.env.fAST_2_SMS + '/SMS/' + phoneNumber + '/' + otp);
//         if (response.data.Status === 'Success') {
//             console.log('OTP sent successfully');
//             return res.status(200).send({ message: 'OTP sent successfully' })
//         } else {
//             console.error('Failed to send OTP');
//             return res.send({ message: 'Failed to send OTP' });;
//         }

//         // return res.status(200).send({ message: 'successfully send otp :', otpa })
//     }
//     catch (error) {
//         return res.send({ message: 'error in login with otp' + error });
//     }
// })

// //login otp verify OTP SMS
// authRoute.post('/verify/login-otp', async (req: Request, res: Response) => {
//     try {
//         // get the otp and id from the req.body and check the otp is valid or expried baed on the time 

//         const otpToVerify = req.body.otp;
//         const phoneNumber = req.body.phone_number
//         // check the user exsists or not 
//         const chekUser: any = await Users.findOne({ where: { phone_number: phoneNumber } })
//         if (!chekUser) {
//             return res.status(404).send({ message: "User not found" })
//         }
//         const response = await axios.get(`https://2factor.in/API/V1/${process.env.fAST_2_SMS}/SMS/VERIFY3/${phoneNumber}/${otpToVerify}`);
//         if (response.data.Status === 'Success') {
//             console.log('OTP is valid');

//             if (chekUser?.user_type == 1 || chekUser?.user_type == 2) {
//                 let token = jwt.sign(
//                     { id: chekUser?.id, username: chekUser.user_name, email: chekUser.email, user_type: chekUser?.user_type, phone_number: chekUser.phone_number },

//                     "SECRET_ACCESS_KEY",
//                     { expiresIn: "1h" }
//                 );
//                 return res.send({
//                     message: "success", token: token
//                 })
//             }

//             let token = jwt.sign(
//                 { id: chekUser?.id, username: chekUser.user_name, email: chekUser.email, phone_number: chekUser.phone_number },

//                 "SECRET_ACCESS_KEY",
//                 { expiresIn: "1h" }
//             );
//             return res.send({
//                 message: "success", token: token
//             })
//         } else {
//             console.error('OTP is invalid');
//             return res.send({ message: 'OTP is invalid' });;
//         }

//         // return res.status(200).send({ message: 'successfully send otp :', otpa })
//     }
//     catch (error) {
//         return res.send({ message: 'error in login with otp' + error });
//     }
// })






authRoute.post("/login-social", async (req:Request,res: Response) => {
    try {

        const chekUser:any = await Users.findOne({where:{email:req.body.email}})

        
        if (chekUser) {
            let token = ""
            if (chekUser?.user_type == 1) {
            
             token =  jwt.sign(
                { id:chekUser?.id, username: chekUser.user_name, email: chekUser.email,role:chekUser?.user_type },

                "SECRET_ACCESS_KEY",
                { expiresIn: "1h" }
            );
        }else {
            token =  jwt.sign(
                { id:chekUser?.id, username: chekUser.user_name, email: chekUser.email },
                "SECRET_ACCESS_KEY",
                { expiresIn: "1h" }
            );
        }

        res.send({message:'success',token:token})
        }
        else {
            res.send({message:"user not found"})
        }

         

    }
    catch (err:any) {
        res.send({message:err.message})
    }
})


// send otp in mail 

authRoute.post("/forgot_password", async (req:Request, res:Response) =>{
    try {
           const body = req.body
           const checkEmail = await Users.findOne({where: {email:body.email}})
           if (!checkEmail){
               return res.status(403).send({message: "Kindly Enter email address"})
           }
           let otp = Math.floor(10000 + Math.random() * 900000);
       const newObject:any = {
            email : checkEmail.email,
            otp : otp,
      }
      const tokenResponse = await Otp.create(newObject)
   //code chupinchuu aka
   
      let mailOptions = {
        // user:"sathish.d@techallylabs.com" ,
        // pass: "xfjj smyg ahvv hzoj"
       from : "sathish.d@techallylabs.com",
       to: checkEmail.email,
       subject: 'Otp For Forgot Password ',
       text: tokenResponse.otp.toString()
   }
   
   transporter.sendMail(mailOptions,function(err:any,success:any) {
       if (err) {
           res.send(err)
       }
       else {
           res.send({message:'email sent'})
       }
   })   
   } catch (error) {
           res.send({message: "error in getting otp"})
       }
   
   })


   authRoute.post('/verify', async (req:Request,res:Response) => {
    try {

        const response = await Otp.findAll({where:{otp:req.body.otp},order:[['id','DESC']]})

        const otp = response[0].otp

        if (otp == req.body.otp) {
            res.send('success')
        } else {
            res.send('error')
        }
    }
    catch(err:any) {
        res.send({message:err.message})
    }
})

authRoute.get('/otpdetails/:otp', async (req:Request, res:Response) => {
    try{
const optparams = parseInt(req.params.otp)
const otp = await Otp.findOne({where:{otp:optparams}})
res.status(200).send(otp?.email)
    }catch(err) {
        res.status(404).send(`error:- ${err}`)
    }
})

authRoute.patch("/changepassword", async (req:Request, res:Response) => {
    try {
        const passwordChange = await Users.update(req.body,{where:{email:req.body.email}})
        res.status(200).send({message:'Successfully Updated Password', data:passwordChange})
        
    } catch (error) {
        res.status(401).send({message : "Error Will Updating Password" , error: error})
    }
})



export default authRoute;