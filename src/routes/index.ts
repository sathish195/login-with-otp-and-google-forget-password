import { Router } from "express";
import authRoute from "./auth.route";
// import productRouter from "./product.route";
import otpRouter from "./otp.route";
const route=Router()

route.use('/auth',authRoute)
// route.use('/productrouter',productRouter)
route.use('/otp',otpRouter)

export default route