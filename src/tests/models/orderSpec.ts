import { orderModel ,status } from "../../models/order";
import { userModel } from "../../models/user";
import { productModel } from "../../models/product";
import { truncatedb } from "../../utilities/truncatedb";

const user = new userModel()
const order = new orderModel()
const product =new productModel()
describe("Order Model", () => {
  beforeAll(async () => {
    await truncatedb();
  });
  afterAll(async () => {
    await truncatedb();
  });
  
    it('should have an index method', () => {
      expect(order.showAll).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(order.showOne).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(order.create).toBeDefined();
    });
   
    it('create method should add order', async () => {
      await user.create({
        firstName:"eslam",
        lastName:"mohamed",
        username:"eslamxm",
        password:"0000"
      });
      const result = await order.create({
        status:"active" as unknown as status,
        user_id:1
      });
      expect(result).toEqual({
        id : 1,
        status:"active" as unknown as status,
        user_id:1
      });
    });
    it('addProductToOrder method should add product to order', async () => {
      await product.create({
        name:"test",
        price:10
      });
      
      const result = await order.addProductToOrder({
        order_id:1,
        product_id:1,
        quantity:10
      });
      expect(result).toEqual({
        id : 1,
        order_id:1,
        product_id:1,
        quantity:10
      });
    });
  
  
    it('show all method should return a list of orders', async () => {
      const result = await order.showAll();
      expect(result).toEqual([{
        id : 1,
        status:"active"as unknown as status,
        user_id:1
      }]);
    });
  
    it('show one method should return the correct order with the given id', async () => {
      const result = await order.showOne(1);
      expect(result).toEqual({
        id : 1,
        status:"active"as unknown as status,
        user_id:1

      });
    });
    
  });
  