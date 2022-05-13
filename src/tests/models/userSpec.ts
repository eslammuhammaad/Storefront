import { userModel } from "../../models/user";
import { truncatedb } from "../../utilities/truncatedb";

const user = new userModel()
describe("User Model", () => {
    beforeAll(async () => {
      await truncatedb();
      
    });

    afterAll(async () => {
      await truncatedb();
    }); 

    it('should have an index method', () => {
      expect(user.showAll).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(user.showOne).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(user.create).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(user.delete).toBeDefined();
    });
   
    it('create method should add a user', async () => {
      const result = await user.create({
        firstName:"eslam",
        lastName:"mohamed",
        username:"eslamxm",
        password:"0000"
      });
      expect(result.id).toEqual(1);
      expect(result.username).toBe("eslamxm");
      expect(result.password).not.toBe("0000");
    });

  /*  it('login method should login a user', async () => {
      const result = await user.login("eslamxm","0000");
     
      expect(result?.password).not.toBe("0000");
     
    });
*/
  
   it('show all method should return a list of users', async () => {
      const result = await user.showAll();
      expect(result[0].id).toEqual(1);
      expect(result[0].username).toBe("eslamxm");
      expect(result[0].password).not.toBe("1234");
    });

  
   it('show one method should return the correct user with the given id', async () => {
      const result = await user.showOne(1);
      expect(result.id).toEqual(1);
      expect(result.username).toBe("eslamxm");
      expect(result.password).not.toBe("1234");
    });
  
 
   it('delete method should remove the user', async () => {
      user.delete(1);
      const result = await user.showAll()
  
      expect(result).toEqual([]);
    });
  });
  