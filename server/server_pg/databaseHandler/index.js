const {Client} = require('pg')
var connectionString = "postgres://postgres:postgres@localhost:5432/BRS";

const client = new Client({
    connectionString: connectionString
});

const connectPG = (callback)=>{
    client.connect().then(()=>{
    console.log("Database connected")
    callback()
    }).catch(e=>{console.log(e)})}

const getClient = ()=>{
    return client;
}

const terminateConnection = ()=>{
    client.end();
}

module.exports={
    connectPG,
    getClient,
    terminateConnection
}

