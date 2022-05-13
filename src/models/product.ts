import client from "../database";

export type Product = {
    id?:number,
    name:string,
    price:number
}

export class productModel{

    async showAll():Promise<Product[]> {
        try {
            const conn=await client.connect()
            const sql ='SELECT * FROM products'
            const result= await conn.query(sql)
            conn.release()

            return result.rows

        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get products `)
        }
    }

    async showOne(id:number):Promise<Product>  {
        try{
            const conn =await client.connect()
            const sql ='SELECT * FROM products WHERE id=($1)'
            const result =await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get product with id ${id} `)
            }
    }

    async create(p:Product):Promise<Product>{
        try{
            const conn =await client.connect()
            const sql ='INSERT INTO products(name,price) VALUES($1,$2) RETURNING *'
            const result =await conn.query(sql,[p.name,p.price])
            conn.release()
            const product : Product =result.rows[0]
            return product
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't insert product ${p.name} to database. `)
            }
    }

    async delete(id:number):Promise<Product>  {
        try{
            const conn =await client.connect()
            const sql ='DELETE FROM products WHERE id=($1)'
            const result =await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't Delete product with id ${id} `)
            }
    }

}