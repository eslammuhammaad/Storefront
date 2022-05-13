import express,{ Request,Response} from "express";
import { authorize } from "../middleware/verification";
import { Order,orderModel,Order_Product } from "../models/order";
import dotenv from 'dotenv';

dotenv.config()

const auth_token = process.env.TOKEN_SECRET as string;

const new_order = new orderModel();




const showOne = async (req:Request,res:Response)=>{
    try{
        const order =await new_order.showOne(req.params.id as unknown as number)
        res.json(order)
    }catch(err){
        res.sendStatus(500);
    }
    
}

const create= async (req:Request,res:Response)=>{
    
    try{
        const o:Order={
            status:req.body.status,
            user_id:req.body.user_id,
        }
        const order =await new_order.create(o)
        res.json(order)

    }catch(err){
        res.status(400)
        res.send(err)
        res.json(err)

    }
}



  const addProductToOrder = async (_req: Request, res: Response) => {
    
    const o_p:Order_Product={
        order_id:_req.params.id as unknown as number,
        product_id:_req.body.product_id ,
        quantity:_req.body.quantity 
       }
  
    try {
      const addedProduct = await new_order.addProductToOrder(o_p)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
      res.send("order completed")
      
    }
  }



const orderRoute=(app:express.Application)=>{
    app.get('/orders/:id',authorize,showOne)
    app.post('/orders',authorize,create)
    app.post('/orders/:id/products',authorize,addProductToOrder)

}

export default orderRoute;