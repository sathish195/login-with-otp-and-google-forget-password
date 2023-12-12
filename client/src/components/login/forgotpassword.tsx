import * as React from 'react';
import { Box, Radio, TextField, colors } from '@mui/material';
import Button from '@mui/material/Button';
import bcrypt from "bcrypt";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useState } from 'react';
import { ForgotPasswordApi, VerifyOtpApi } from '../../apiRequest/login';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //   width: 400,
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid #D85737',

    boxShadow: 24,
    p: 4,
    borderRadius: "25px"
};

export default function ForgotPassword() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [mobile, setMobile] = useState("")
    const [OptMail, setOptMail] = useState(false)
    const [email, setEmail] = useState('')
    const [radio, setRadio] = useState(true)
    const [Otp, setOtp] = useState('')

    const [selectedValue, setSelectedValue] = React.useState(true);
    const [sanckMsg, setSanckMsg] = useState('')
    const [indicator, setIndicator] = useState(true)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.checked);
    };


    const OnClickSubmit = async () => {
        const data = {
            //mobile
            // phoneNumber: parseInt(mobile),
            //email
            email: email
        }
        const sendEmailOtp = await ForgotPasswordApi(data)
        if (sendEmailOtp.message === 'email sent') {
            setOptMail(true)
            setSanckMsg("Otp sent your email address")
            setIndicator(true)
            setOpen(true);
        } else {
            setSanckMsg(sendEmailOtp.message)
            setIndicator(false)
            setOpen(true);
        }
        //  const sendotpMobile = await sendOtp(data)
        // console.log(sendotpMobile)
    }

    const OnClickVerify = async () => {
      
        const data = { otp: parseInt(Otp) }

        const OtpApi = await VerifyOtpApi(data)

        if (OtpApi === 'success') {
            window.location.replace(`/changepassword/${Otp}`)
        }
    }
    return (
        <div>

            {/* <button onClick={handleOpen} className="btn btn-link">Forgot Password</button> */}

            <Box sx={style}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <a href="/" title="homepage">
                        {/* <img src="https://res.cloudinary.com/djrgrpuqn/image/upload/v1689071814/Final_Logo_Doc-06_1_gxl3m8.png" /> */}
                        Enter Email
                    </a>
                </Box>
                <Typography id="modal-modal-title" variant="h6" component="h5">
                    Forgot Password
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    <TextField value={email} sx={{ width: "400px" }} onChange={(e) => setEmail(e.target.value)} label={"Enter Your E-mail"} variant='outlined' />
                    {/* <div className='d-flex justify-content-center'> <b>Or</b></div>
           <TextField value={ mobile } onChange={(e)=>setMobile(e.target.value)} label={"Enter Your Phone" } variant='outlined'/>
          */}
                    {OptMail ? null :
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button sx={{ mt: 2, bgcolor: "#D85737", color: "dark", fontWeight: 500 }} variant="contained" onClick={OnClickSubmit}>Submit</Button>
                        </Box>
                    }

                    <div >
                        {
                            OptMail ?
                                <Box sx={{ mt: 3 }}>
                                    <TextField value={Otp} sx={{ width: "400px" }} onChange={(e) => setOtp(e.target.value)} label={"Enter OTP"} variant='outlined' />
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Button sx={{ mt: 3, bgcolor: "#D85737", color: "dark", fontWeight: 500 }} variant="contained" onClick={OnClickVerify} className=" my-2 btn btn-outline-success">verify</Button>
                                    </Box>
                                </Box>
                                : null
                        }
                    </div>
                </Typography>
            </Box>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={indicator ? "success" : "error"} sx={{ width: '100%' }}>
                    {sanckMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}