const express = require (`express`);

const server = express();

server.get(`/`, (req, res)=>{
    res.send(`Hola mundo`)
})

server.listem(8080, ()=>console.log(`server up and running on port 8080`));