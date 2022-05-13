import { productModel } from "../../models/product";
import { truncatedb } from "../../utilities/truncatedb";

const product = new productModel()
describe("Product Model", () => {
    beforeAll(async () => {
      await truncatedb();
    });
    afterAll(async () => {
      await truncatedb();
    });  
    it('should have an index method', () => {
      expect(product.showAll).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(product.showOne).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(product.create).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(product.delete).toBeDefined();
    });

    
    it('create method should add a product', async () => {
      const result = await product.create({
        name:"test",
        price:10
      });
      expect(result).toEqual({
        id : 1,
        name:"test",
        price:10
      });
    });
  
  
    it('show all method should return a list of products', async () => {
      const result = await product.showAll();
      expect(result).toEqual([{
        id : 1,
        name:"test",
        price:10
      }]);
    });
  
    it('show one method should return the correct product with the given id', async () => {
      const result = await product.showOne(1);
      expect(result).toEqual({
        id : 1,
        name:"test",
        price:10

      });
    });
  
    it('delete method should remove the product', async () => {
      product.delete(1);
      const result = await product.showAll()
  
      expect(result).toEqual([]);
    });
  });
  