import client from "../database";


export const enum status{
    complete,
    active
}
export type Order = {
    id?:number,
    status:status
    user_id:number,
}

export type Order_Product={
    id?:number,
    order_id:number,
    product_id:number,
    quantity:number
}

export class orderModel{

    async showAll():Promise<Order[]> {
        try {
            const conn=await client.connect()
            const sql ='SELECT * FROM orders'
            const result= await conn.query(sql)
            conn.release()

            return result.rows

        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get orders `)
        }
    }

    async showOne(id:number):Promise<Order>  {
        try{
            const conn =await client.connect()
            const sql ='SELECT * FROM orders WHERE id=($1)'
            const result =await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't get order with id ${id} `)
            }
    }

    async create(o:Order):Promise<Order>{
        try{
            const conn =await client.connect()
            const sql ='INSERT INTO orders(status,user_id) VALUES($1,$2) RETURNING *'
            const result =await conn.query(sql,[o.status,o.user_id])
            conn.release()

            return result.rows[0]
        }
        catch(err){
            throw new Error(`There's error: ${err}, Couldn't insert order ${o.id} to database. `)
            }
    }

    
    async addProductToOrder(o_p:Order_Product): Promise<Order_Product> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(ordersql, [o_p.order_id])
            
            const order = result.rows[0]
    
            if (order.status !== "active") {
              throw new Error(`Could not add product ${o_p.product_id} to order ${o_p.order_id} because order status is ${order.status}`)
            }
      
            conn.release()
          } catch (err) {
            throw new Error(`${err}`)
          }
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          
          const conn = await client.connect()
    
          const result = await conn.query(sql, [o_p.quantity,o_p.order_id,o_p.product_id]) 
    
          conn.release()
    
          return result.rows[0]
        } catch (err) {
            throw new Error(`There's error: ${err}, Couldn't insert product ${o_p.product_id} to order ${o_p.order_id} database. `)
          
        }
      }
  
}