import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { Order, Order_Product, status } from '../../models/order';
import { truncatedb } from '../../utilities/truncatedb';


const u:User={
    firstName:"eslam",
    lastName:"mohamed",
    username:"eslam",
    password:"0000"
}
const o:Order={
    status:"active" as unknown as status,
    user_id:1
}
const o_p:Order_Product={
    order_id:1,
    product_id:1 ,
    quantity:10
   }

   const p:Product={
    name:"test product",
    price:100
}

const request = supertest(app);

describe('Order model api (endpoint) responses.', () => {
  /* beforeEach(async () => {
        await truncatedb();
      });*/
      afterAll(async () => {
        await truncatedb();
      });  
  it('post order api endpoint status to be 200.', async () => {
    await request.post('/users').send(u); 
    const token = await request.post('/users/login').send(u);
    const tested = await request.post('/orders').send(o).set({ Authorization: 'Bearer ' + token.body });
    expect(tested.status).toEqual(200);
  });

 
it('get order method api should return a specific order related status to be 200', async () => {
    
    const token = await request.post('/users/login').send(u);
    const tested = await request.get("/orders/1").set({ Authorization: 'Bearer ' + token.body });
    expect(tested.status).toEqual(200);
  });

 it('add product to order method api  status should to be 200', async () => {
    
    const token = await request.post('/users/login').send(u);
    await request.post('/products').send(p).set({ Authorization: 'Bearer ' + token.body });

    const tested =await request.post("/orders/1/products").set({ Authorization: 'Bearer ' + token.body }).send(o_p);
    expect(tested.status).toEqual(200);
    
  });
});