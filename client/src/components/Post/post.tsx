import React,{useState} from "react";
import {Box, Button, TextField} from "@mui/material"

const Post = () => {

    const [productname,setProductName] = useState("")
    const [productcost,setProductCost] = useState("")


    const onChangeProductName=(e:any)=>{
        setProductName(e.target.value)
        
    }
    const onChangeProductCost=(e:any)=>{
        setProductCost(e.target.value)

        
    }

    

    const submitData = () => {
        const obj ={
            productname:productname,
            productcost:productcost
        }
        
        console.log(obj)
    }


 

    return(
     <Box>
        <Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Poduct Name"
          multiline
          maxRows={4}
          onChange={onChangeProductName}
        />

<TextField
          id="outlined-multiline-flexible"
          label="Enter Poduct Cost"
          multiline
          maxRows={4}
          onChange={onChangeProductCost}

        />
        </Box>
        <Button variant="contained" onClick={submitData}>submit</Button>


     </Box>
    )
}

export default Post