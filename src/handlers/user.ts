import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express,{ Request,Response} from "express";
import { User, userModel } from "../models/user";
import { authorize } from "../middleware/verification";

dotenv.config()

const auth_token = process.env.TOKEN_SECRET as string;


const new_user = new userModel();

const showAll = async (_req:Request,res:Response)=>{
   try {
    const users =await new_user.showAll();
    res.json(users)
   }catch(err){
       res.sendStatus(500);
   }       
}

const showOne = async (req:Request,res:Response)=>{
    try{
        const user =await new_user.showOne(req.params.id as unknown as number)
        res.json(user)
    }catch(err){
        res.sendStatus(500);
    }
    
}

const create= async (req:Request,res:Response)=>{
    try{
        const u:User={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            username:req.body.username,
            password:req.body.password
        }
        const user =await new_user.create(u)
        var token = jwt.sign({user:user},auth_token)
        res.json(token)

    }catch(err){
        res.status(400)
        res.json(err)
    }
}
const login= async (req:Request,res:Response)=>{
    try{
        const u:User={
            username:req.body.username,
            password:req.body.password
        }
        const user =await new_user.login(u.username,u.password)
        var token = jwt.sign({user:user},auth_token)
        res.json(token)

    }catch(err){
        res.status(400)
        res.json(err)
        console.log("error")
    }
}

const destroy = async (req:Request,res:Response)=>{
    try{
        const user =await new_user.delete(req.body.id)
        res.json(user)
    }catch(err){
        res.sendStatus(500);
    }

}

const userRoute=(app:express.Application)=>{
    app.get('/users',authorize,showAll)
    app.get('/users/:id',authorize,showOne)
    app.post('/users' , create)
    app.delete('/users', authorize,destroy)
    app.post('/users/login', login)
}

export default userRoute;