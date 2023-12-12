import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { verifyOtps } from "../../apiRequest/otp";

const Verifyotp = () => {
  const [otp, setOtp] = useState("");

  const onChangeOtp = (e: any) => {
    setOtp(e.target.value);
  };

  const onClickVerifyOtp = async () => {
    const responseVerifyOtp = await verifyOtps({
      otp: otp,
    });
    console.log(responseVerifyOtp);

    if (otp.length === 4 && responseVerifyOtp == "success") {
      alert("Verifycatioon successfull");
       document.location.replace("https://shelfmerch.com");
    } else {
      alert("verification failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h1>Verify Otp</h1>
      <Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Otp"
          multiline
          maxRows={4}
          onChange={onChangeOtp}
        />
      </Box>
      <Button variant="contained" onClick={onClickVerifyOtp}>
        Veriry
      </Button>
    </Box>
  );
};

export default Verifyotp;
