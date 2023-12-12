import { Router, Request, Response } from "express";
import axios from "axios";
import Otps from "../db/models/Otps";

// Fast2SMS API key
const Api =process.env.Api;

const otpRouter = Router();


// send the otp  mobile and store the phonenumber and opt in otps table

otpRouter.post("/", async (req: Request, res: Response) => {
  try {
   
    const MobileNum: any = req.body.ph_number;
    if (MobileNum.length === 10) {
      // const otp = Math.floor(10000 + Math.random() * 900000);
      const otp = Math.floor(1000 + Math.random() * 9000);
      const message: any = `Your OTP is ${otp}.`;

      const newObjects: any = {
        ph_number: MobileNum,
        otp: otp,
      };
      const tokenResponse: any = await Otps.create(newObjects);
      const phoneNumber = MobileNum;

      const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          route: "q",
          message,
          language: "english",
          numbers: phoneNumber,
        },
        {
          headers: {
            authorization: Api,
          },
        }
      );

      res.send({
        message: "SMS Sent successfully",
        data: response,
      });
    } else {
      return res.status(400).send({ message: "Please Enter the valid number" });
    }
  } catch (error: any) {
    // console.error(
    //   "Error sending SMS:",
    //   error.response ? error.response.data : error.message
    // );
    res.status(500).send({ message: error.message });
  }
});


// otp verify route

otpRouter.post("/verify", async (req: Request, res: Response) => {
  try {
    const response:any = await Otps.findOne({
      where: { otp: req.body.otp },
      order: [["id", "DESC"]],
    });

    const otp = response.otp;

    if (otp == req.body.otp) {
      res.send("success");
    } else {
      res.send("inccorect otp");
    }
  } catch (err: any) {
    res.send({ message: err.message });
  }
});



// var x = new Date(response.createdAt);
// var y = new Date();
// let seconds = Math.abs(y.getTime() - x.getTime()) / 1000;

// if (seconds < 60) {
//   const otp = response.otp;

//   if (otp == req.body.otp) {
//     res.send({ message: "success", data: seconds,response });
//   } else {
//     res.send("inccorect otp");
//   }

// } else {
//   res.send({ message: "expired",data: x,response });
// }
// } catch (err: any) {
// res.send({ message: err.message });
// }
export default otpRouter;
