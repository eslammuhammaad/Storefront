import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { truncatedb } from '../../utilities/truncatedb';


const u:User={
    firstName:"eslam",
    lastName:"mohamed",
    username:"eslam",
    password:"0000"
}
const p:Product={
    name:"test product",
    price:100
}

const request = supertest(app);

describe('Product model api (endpoint) responses.', () => {
    beforeAll(async () => {
        await truncatedb();
      });
      afterAll(async () => {
        await truncatedb();
      });  

  it('post products api endpoint status to be 200.', async () => {
    const token = await request.post('/users/login').send(u);
    const tested = await request.post('/products').send(p).set({ Authorization: 'Bearer ' + token.body });
    expect(tested.status).toEqual(200);
  });

 
 it('get users method api should return a list of products status to be 200', async () => {
    
    const tested = await request.get("/products");
    expect(tested.status).toEqual(200);

  });

 
  it('get product method api should return a specific product related status to be 200', async () => {
    
    const tested = await request.get("/products/1");
    expect(tested.status).toEqual(200);
  });

  it('delete product method api  status should to be 200', async () => {

    const token = await request.post('/users/login').send(u);
    const tested =await request.delete("/products").set({ Authorization: 'Bearer ' + token.body }).send({id:"1"});
    expect(tested.status).toEqual(200);
    
  });
});