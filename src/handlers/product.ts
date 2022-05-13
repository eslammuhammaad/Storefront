import express,{ Request,Response} from "express";
import { Product,productModel } from "../models/product";
import { authorize } from "../middleware/verification";

const new_product = new productModel();

const showAll = async (_req:Request,res:Response)=>{
   try {
    const products =await new_product.showAll();
    res.json(products)
   }catch(err){
       res.sendStatus(500);
   }       
}

const showOne = async (req:Request,res:Response)=>{
    try{
        const product =await new_product.showOne(req.params.id as unknown as number)
        res.json(product)
    }catch(err){
        res.sendStatus(500);
    }
    
}

const create= async (req:Request,res:Response)=>{
    try{
        const p:Product={
            name:req.body.name,
            price:req.body.price
        }
        const product =await new_product.create(p)
        res.json(product)

    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req:Request,res:Response)=>{
    try{
        const product =await new_product.delete(req.body.id)
        res.json(product)
    }catch(err){
        res.sendStatus(500);
    }

}

const productRoute=(app:express.Application)=>{
    app.get('/products', showAll)
    app.get('/products/:id', showOne)
    app.post('/products', authorize,create)
    app.delete('/products',authorize,destroy)

}

export default productRoute;