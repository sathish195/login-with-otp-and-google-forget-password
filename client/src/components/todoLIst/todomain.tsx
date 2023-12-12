import { table } from "console";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

const Edit = (props: any) => {
  const { value,deleteButton,editFunc} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [data, setData] = useState(value);
// console.log(data);

// useEffect(()=>{
//   data
// })



  console.log(value);

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
        <tr>
          {value.map((x: any) => (
            <tr key={x.id}>
               
              <td>{x.value}</td>
              <td>{x.age}</td>
              <td><button onClick={() => deleteButton(x.id)}>X</button></td>
              <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
          id="outlined-password-input"
          label="Name"
          type="text"
          autoComplete="current-password"
         />
             <TextField
          id="outlined-password-input"
          label="Age"
          type="number"
          autoComplete="current-password"
         />
         <Box>
<Button variant="contained">cancel</Button>
<Button variant="contained">update</Button>


         </Box>
        </Box>
        
      </Modal>

            </tr>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Edit;
