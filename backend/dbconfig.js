import { MongoClient } from "mongodb"

const url="mongodb://localhost:27017";
const dbName="node-project";



// yaha export kiya ya hai
export const collectionName="todo"

const client=new MongoClient(url)




// yaha bhi export kiya gya hai

export const connection=async()=>{
    const connect=await client.connect()
    return connect.db(dbName)
}
