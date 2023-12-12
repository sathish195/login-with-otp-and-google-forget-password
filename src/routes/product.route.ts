// import { Router, Request, Response } from "express";
// import Products from "../db/models/product";

// const productRouter = Router();

// productRouter.post("/", async (req: Request, res: Response) => {
//   try {
//     const reqData = req.body;

//     const productName = reqData.product_name;
//     if (productName.length === 0 || !productName) {
//       return res
//         .status(400)
//         .send({ message: "Please Enter the user product name" });
//     }

//     const productCost = reqData.product_cost;
//     if (productCost.length === 0 || !productCost) {
//       return res.status(400).send({ message: "Please Enter the product cost" });
//     }
//     const newObject:any = {
//       productName : productName,
//       productCost : productCost,
//     };
//     const response = await Products.create(newObject)

//     res.send({ message: "sucess", data : response });
//   } catch (err: any) {
//     return res.send({ message: err.message });
//   }
// });

// productRouter.get("/", async (req: Request, res: Response) => {
//   try {

//     const response = await Products.findAll();
//     res.send({ message: "sucess", data: response });
//   } catch (err: any) {
//     return res.send({ message: err.message });
//   }
// });


// productRouter.get("/", async (req: Request, res: Response) => {
//     try {
  
//       const response = await Products.findAll();
//       res.send({ message: "sucess", data: response });
//     } catch (err: any) {
//       return res.send({ message: err.message });
//     }
//   }); 

// productRouter.patch("/:id",async(req:Request,res:Response) =>{

//   const id:any = req.params.id
//   const data = req.body
//   const response:any = await Products.update(data,{where:{id:id}})
//   res.send({message:"sucess",data:response})
// })

// export default productRouter;
