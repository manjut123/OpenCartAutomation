
import {test,request, expect} from '@playwright/test';

test('get all users ',async({request})=>{

      let response=await request.get('https://gorest.co.in/public/v2/users/');
      
      let resbody=await response.json();
        
      console.log(resbody);
      console.log(response.status()," ",response.statusText());
     let totalObjects=(await response.body()).length;

     console.log("total ",totalObjects);
     const getuid=resbody[0].id;
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe('OK');
      expect(totalObjects).toBeGreaterThan(100);
    
      
})

test('get specific user details using id',async({request})=>{

      let response=await request.get('https://gorest.co.in/public/v2/users/');
      
      let resbody=await response.json();
        
      console.log(response.status()," ",response.statusText());
     let totalObjects=(await response.body()).length;

     console.log("total ",totalObjects);
     const getuid=resbody[0].id;
     
    response=await request.get(`https://gorest.co.in/public/v2/users/${getuid}`);

     resbody=await response.json();

     console.log(typeof resbody);
     console.log(Object.keys(resbody).length);

     expect(resbody.name).toBe('Ganak Johar DVM');
    
      
})

/*
{
    "id": 8505075,
    "name": "test mtk",
    "email": "mtqq@cormier.example",
    "gender": "female",
    "status": "active"
}
*/

test('verify create new user and get same user ',async({request})=>{
    const headertoken='Bearer 1bdedaf60d098699df53f0ba6a0d3d31482a2df62f42e3db1987641f2c990971';
    const payload={
        name: "test feer",
        email: `test-${Date.now()}mt@abc.com`,
        gender: "female",
        status: "active"      
    }
    //console.log(payload.email);
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers: {
        'Authorization': headertoken,
        'Content-Type': 'application/json'
    },
    data:payload
   });
    
   let resbody=await response.json();
   
   expect(response.status()).toBe(201);
   
   const getCreateid=resbody.id;
   console.log("featchid ",getCreateid);
   
   
     const getResponse = await request.get(`https://gorest.co.in/public/v2/users/${getCreateid}`,
        {
           headers: {
                Authorization: headertoken
           }
        }
    );
  
      console.log(getResponse.status());
      console.log(await getResponse.text());
    
})


test('verify update users using put call ',async({request})=>{
    const headertoken='Bearer 1bdedaf60d098699df53f0ba6a0d3d31482a2df62f42e3db1987641f2c990971';
    const payload={
        name: "testupdate",
        email: `test-${Date.now()}mt@abc.com`,
        gender: "female",
        status: "active"      
    }
    //console.log(payload.email);
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers: {
        'Authorization': headertoken,
        'Content-Type': 'application/json'
    },
    data:payload
   });
    
   let resbody=await response.json();
   
   expect(response.status()).toBe(201);
   const featchID=resbody.id;
   console.log("featchid ",featchID);
   const mail=payload.email;
   
    const payload1={
        name: "testupdate",
        email: mail,
        gender: "female",
        status: "inactive"      
    }
    response=await request.put(`https://gorest.co.in/public/v2/users/${featchID}`,{
        headers:{
             Authorization: headertoken,
            'Content-Type': 'application/json'
        },
        data:payload1
    });

     
     const getResponse = await request.get(`https://gorest.co.in/public/v2/users/${featchID}`,
        {
           headers: {
                Authorization: headertoken
           }
        }
    );
      resbody=await getResponse.json();
      expect(getResponse.status()).toBe(200);
      expect(resbody.status).toBe('inactive');
    
})

test("Test that Update specific data using patch is working",async({request})=>{

    const mailid=`testpatch_${Date.now()}v@abc.com`;
     const headertoken='Bearer 1bdedaf60d098699df53f0ba6a0d3d31482a2df62f42e3db1987641f2c990971';
       const patchdata={
        name: "testupdate",
        email: mailid,
        gender: "female",
        status: "inactive"      
    }
       
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers:{
             Authorization: headertoken,
            'Content-Type': 'application/json'
        },
        data:patchdata
    });
     expect(response.status()).toBe(201);  
      
     let responsedata=await response.json();
      
     const featchid=responsedata.id;

     //patch request - update status from active to inactive for above user
      const updatedata={
        status:'inactive'
      };
      response=await request.patch(`https://gorest.co.in/public/v2/users/${featchid}`,{
        headers:
        {
           Authorization:headertoken,
           'Content-Type':'application/json'
        },
        data:updatedata
     });

     console.log("patch response ",response.status());

     //verify patch - updated data using get request

     response=await request.get(`https://gorest.co.in/public/v2/users/${featchid}`,{
        headers:{
            Authorization:headertoken
        }
     });

     responsedata=await response.json();

     console.log(responsedata);

     const getstatus=await responsedata.status;

    expect(getstatus).toBe('inactive');    

    })


    test('verify delete user ',async({request})=>{
    const headertoken='Bearer 1bdedaf60d098699df53f0ba6a0d3d31482a2df62f42e3db1987641f2c990971';
    const payload={
        name: "test feer",
        email: `test-${Date.now()}mt@abc.com`,
        gender: "female",
        status: "active"      
    }
    //console.log(payload.email);
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers: {
        'Authorization': headertoken,
        'Content-Type': 'application/json'
    },
    data:payload
   });
    
   let resbody=await response.json();
   
   expect(response.status()).toBe(201);
   
   const getCreateid=resbody.id;
   console.log("featchid ",getCreateid);

  let delres=await request.delete(`https://gorest.co.in/public/v2/users/${getCreateid}`,{
     headers: {
        'Authorization': headertoken,
    }
  });
   
  console.log(delres.status())
    let getres=await request.get(`https://gorest.co.in/public/v2/users/${getCreateid}`,{
     headers: {
        'Authorization': headertoken,
    }
  });
   
  let res=await getres.json();

  //let message=await res.body.message;

  console.log(res.message);
   


});