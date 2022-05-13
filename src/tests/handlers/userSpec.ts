import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { truncatedb } from '../../utilities/truncatedb';


const u:User={
    firstName:"eslam",
    lastName:"mohamed",
    username:"eslam",
    password:"0000"
}
const request = supertest(app);

describe('User model api (endpoint) responses.', () => {
  beforeAll(async () => {
    await truncatedb();
  }); 
  afterAll(async () => {
    await truncatedb();
  }); 

  it('post users api endpoint status to be 200.', async () => {
    const tested = await request.post('/users').send(u);
    expect(tested.status).toEqual(200);
  });

  it('post users login api endpoint status to be 200.', async () => {

    const tested = await request.post('/users/login').send(u);
    expect(tested.status).toEqual(200);
    
  });

  it('get users method api should return a list of users status to be 200', async () => {
    
    const token = await request.post('/users/login').send(u);
    const tested = await request.get("/users").set({ Authorization: 'Bearer ' + token.body });

    expect(tested.status).toEqual(200);

  });

  it('get user method api should return a specific user related to user id status to be 200', async () => {
    
    const token = await request.post('/users/login').send(u);
    const tested = await request.get("/users/1").set({ Authorization: 'Bearer ' + token.body });
    expect(tested.status).toEqual(200);
  });

  it('delete user method api  status should to be 200', async () => {

    const token = await request.post('/users/login').send(u);
    const tested =await request.delete("/users").set({ Authorization: 'Bearer ' + token.body }).send({id:"1"});
    expect(tested.status).toEqual(200);
    
  });
});