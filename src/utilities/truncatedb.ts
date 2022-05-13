import client from "../database";

export const truncatedb= async ():Promise<void> => {
    try {
        const conn=await client.connect()
        const sql ='TRUNCATE TABLE orders, users, products, order_products RESTART IDENTITY;';
        await conn.query(sql)
        conn.release()
    }
    catch(err){
        throw new Error(`There's error: ${err}, Couldn't truncate database. `)
    }
}