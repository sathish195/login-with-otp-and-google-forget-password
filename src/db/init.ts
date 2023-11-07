import Users from "./models/Users";

const isDev=true

const dbInit= async()=>{
    await Users.sync({alter:isDev})
}

export default dbInit