import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import client from "../database";

dotenv.config()

const pepper = process.env.BCYPT_PASSWORD;
const saltRounds:string=process.env.SALT_ROUNDS as string;


export type User = {
    id?:number,
    firstName?:string,
    lastName?:string,
    username:string,
    password:string
}

export class userModel{

    async showAll():Promise<User[]> {
        try {
            const conn=await client.connect()
            const sql ='SELECT * FROM users'
            const result= await conn.query(sql)
            conn.release()

            return result.rows

        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get users `)
        }
    }

    async showOne(id:number):Promise<User>  {
        try{
            const conn =await client.connect()
            const sql ='SELECT * FROM users WHERE id=($1)'
            const result =await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get user with id ${id} `)
            }
    }

    async create(u:User):Promise<User>{
        try{
            const conn =await client.connect()
            const sql ='INSERT INTO users(firstName,lastName,username,password) VALUES($1,$2,$3,$4) RETURNING *'

            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            
            const result =await conn.query(sql,[u.firstName,u.lastName,u.username,hash])
            conn.release()
            const user : User =result.rows[0]
            return user
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't insert user ${u.username} to database. `)
            }
    }

    async login (username:string,password:string): Promise<User|null>{
        try{
            const conn =await client.connect()
            const sql ='SELECT password FROM  users WHERE username =($1)'

            
            const result =await conn.query(sql,[username])
            if(result.rows.length){
                const user : User =result.rows[0]
                if(bcrypt.compareSync(password+pepper,user.password)){
                    return user
                }
            }
            return null
        }catch(err){
            throw new Error(`There's error: ${err}, Couldn't login user ${username}.`)
    }
        
    }

    async delete(id:number):Promise<User>  {
        try{
            const conn =await client.connect()
            const sql ='DELETE FROM users WHERE id=($1)'
            const result =await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't Delete user with id ${id} `)
            }
    }

}