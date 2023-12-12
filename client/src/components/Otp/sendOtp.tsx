import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { sendOtps } from "../../apiRequest/otp";

const Sendotp = () => {
  const [ph_number, setPhoneNumber] = useState("");

  const onChangephonenumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const submitData = async () => {
    if (ph_number.length !== 10) {
      alert("enter vallid mobile number");
    } else {
      const obj: any = {
        ph_number: ph_number,
      };
      const response = await sendOtps(obj);
      alert("otp send");
      document.location.replace("/verifyotp");

      console.log(response);
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
      <h1>Send Otp</h1>

      <Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Mobile Number"
          multiline
          maxRows={4}
          onChange={onChangephonenumber}
        />
      </Box>

      <Button sx={{ padding: "10px" }} variant="contained" onClick={submitData}>
        submit
      </Button>
    </Box>
  );
};

export default Sendotp;
