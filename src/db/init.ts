import Users from "./models/Users";
import Otp from "./models/Otp";
// import Products from "./models/product";
import Otps from "./models/Otps";

const isDev=true

const dbInit= async()=>{
    await Users.sync({alter:isDev})
    await Otp.sync({alter : isDev})
    await Otps.sync({alter:isDev})
    // await Products.sync({alter : isDev})
}

export default dbInit