import { NextFunction, Request,Response} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const auth_token = process.env.TOKEN_SECRET as string;

export const authorize = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, auth_token)

        return next()
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
}