const express = require (`express`);

const server = express();
const port = 3005;

server.get(`/`, (req, res)=>{
    res.send(`Hola mundo`)
})

server.listen(port, ()=>console.log(`server up and running on port ${port}`));