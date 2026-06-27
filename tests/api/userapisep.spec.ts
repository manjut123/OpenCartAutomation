
import { ApiHelper } from "../../src/api/ApiHelper";
import {test,expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`,
};
async function createUser(apiHelper:any)
{   

       let userData = {
             name: 'Manju',
             email: `software${Date.now()}@expert.com`,
             gender: 'female',
             status: 'active'
         };
     
         let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
         console.log(response.status);
         expect(response.status).toBe(201);
         return response.body;
}


test('PUT - update new user',async({apiHelper})=>{
    let response=await createUser(apiHelper);
    let featchId=response.id; 
     let userData = {
             name: 'Manju',
             status: 'inactive'
         };
    let putResponse = await apiHelper.put(`/public/v2/users/${featchId}`,userData,AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.status).toBe('inactive');

    let getResponse = await apiHelper.get(`/public/v2/users/${featchId}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.status).toBe('inactive');
})

test('DELETE - delete new user',async({apiHelper})=>{
    let response=await createUser(apiHelper);
    let featchId=response.id; 
     
    let deleteresponse = await apiHelper.delete(`/public/v2/users/${featchId}`,AUTH_HEADER);
    expect(deleteresponse.status).toBe(204);   

    let getres = await apiHelper.get(`/public/v2/users/${featchId}`,AUTH_HEADER);
    expect(getres.body.message).toBe('Resource not found');
   
})

test('Verify new user using Get api',async({apiHelper})=>{
    let response=await createUser(apiHelper);
    let featchId=response.id; 
   
    let getResponse = await apiHelper.get(`/public/v2/users/${featchId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
})


