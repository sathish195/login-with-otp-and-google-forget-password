import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { changePasswordApi, getOtpDetails } from "../../apiRequest/login";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useParams } from 'react-router-dom'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     //   width: 400,
//     bgcolor: 'rgba(255, 255, 255, 0.8)',
//     border: '2px solid #D85737',

//     boxShadow: 24,
//     p: 4,
//     borderRadius: "25px"
// };

export default function ChangePassword(props: any) {
    const { otp } = props;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmStatus, setconfirmStatus] = useState(false)
    const [sanckMsg, setSanckMsg] = useState('')
    const [indicator, setIndicator] = useState(true)
    const { id } = useParams()
    
    
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const getOtpDetailsApi = await getOtpDetails(id)
        setEmail(getOtpDetailsApi)
    }

    const onClickSubmit = async () => {
        const data = { email, password }
        const passwordApi = await changePasswordApi(data)
        if(passwordApi.message === 'Successfully Updated Password'){
            setSanckMsg(passwordApi.message)
            setIndicator(true)
            setOpen(true);
            window.location.replace(`/login`)

        }else{
            setSanckMsg(passwordApi.message)
            setIndicator(false)
            setOpen(true);
        }
    }



    const confirmPassword = (e: any) => {
        if (password === e.target.value) {
            setconfirmStatus(false)
        } else {
            setconfirmStatus(true)

        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    return (
        <div className="d-flex justify-content-center mt-5">

            <Box >
                <div className="card-body">
                    <Box sx={{ display: "flex", justifyContent: "center" }} >
                        <a href="/" title="homepage">
                        <img src="https://res.cloudinary.com/djrgrpuqn/image/upload/v1689071814/Final_Logo_Doc-06_1_gxl3m8.png" />
                        </a>
                    </Box>
                    <div className="p-2">
                        <h6>Change Password</h6>
                        <TextField id="standard-basic" sx={{width:"300px"}} type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="" label="Password" variant="standard" /><br />
                        <TextField id="standard-basic" sx={{width:"300px"}} type="password" onChange={(e) => confirmPassword(e)} error={confirmStatus} helperText={confirmStatus ? "Not Matched" : null} className="my-3" label="Confirm Password" variant="standard" /><br />
                        <Button sx={{ mt: 4, bgcolor: "#D85737", color: "dark", fontWeight: 500 , float:"right"}} variant="contained" onClick={onClickSubmit}>Submit</Button>

                    </div>
                </div>
            </Box>

        
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={indicator ? "success" : "error"} sx={{ width: '100%' }}>
          {sanckMsg}
        </Alert>
      </Snackbar>
        </div>
    )
}