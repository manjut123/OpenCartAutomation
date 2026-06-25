//schema : type of response data
//P ---> C
//ajv --> node lib for the schema validation
//npm install ajv


import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_Token;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//setup the AJV:
let ajv = new Ajv();

//define JSON schema:
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};


let userArraysSchema = {
    "type": "array",
    "items": userSchema
};

let getObject=
    {
   "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "color": {
          "type": "string"
        },
        "capacity": {
          "type": "string"
        }
      },
      "required": [
        "color",
        "capacity"
      ]
    }
  },
  "required": [
    "id",
    "name",
    "data"
  ]
}



test('GET -- get a user', async ({ apiHelper }) => {

    let userData = {
        name: 'schema test',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };


    //post -- create a user
    let createResponse = await apiHelper.post("/public/v2/users", userData, AUTH_HEADER);
    let userId = createResponse.body.id;

    //get - get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getUserResponse.body)

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});


test('GET -- get all users', async ({ apiHelper }) => {

    //get - get a user
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userArraysSchema);
    let isSchemaValid = validate(getUsersResponse.body)

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});

test('openapi getobject schema validation',async({request})=>{

     let res=await request.get('https://api.restful-api.dev/objects/1');
      
     let getres=await res.json();

     let validate=ajv.compile(res);
     let isSchemaValid=validate(getres.body);

     if(!isSchemaValid)
     {
        console.log("errors ",validate.errors);
     }

     console.log("Schema validated!!");
})