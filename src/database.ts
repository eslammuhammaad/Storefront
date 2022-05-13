import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_TEST_DB,
POSTGRES_USER,
POSTGRES_PASSWORD,
ENV
}=process.env


let client: Pool= new Pool();
//console.log(POSTGRES_HOST)
//console.log(POSTGRES_DB)
//console.log(POSTGRES_TEST_DB)
//console.log(POSTGRES_PASSWORD)
//console.log(POSTGRES_USER)
//console.log(ENV)

//console.log("eeeee")
/*if (ENV=='test'){
    client=new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_TEST_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD, 
    })
    console.log("eeeee")
}*/

if (ENV=='dev'){
    client=new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
      })
    console.log(ENV)
}
else{
  client=new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD, 
})
console.log("eeeee")

}
export default client;

/*

{
    "dev": {
      "driver": "pg",
      "host": {
          "ENV":"POSTGRES_HOST"
      },
      "database": {
        "ENV":"POSTGRES_DB"
    },
      "user":  {
        "ENV":"POSTGRES_USER"
    },
      "password":  {
        "ENV":"POSTGRES_PASSWORD"
    }
    },
    "test": {
        "driver": "pg",
        "host": {
            "ENV":"POSTGRES_HOST"
        },
        "database": {
          "ENV":"POSTGRES_TEST_DB"
      },
        "user":  {
          "ENV":"POSTGRES_USER"
      },
        "password":  {
          "ENV":"POSTGRES_PASSWORD"
      }
      }
  }
*/ 