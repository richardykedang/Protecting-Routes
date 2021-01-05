const http = require('http');

const data = JSON.stringify("<h1>hello worldsss</h1>");
const newObj = JSON.parse(data)
const newObj2 = Object.assign({message : newObj})
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-type': 'text/html'})
    res.write(newObj2.message) 
    res.write("<h1>Hello World</h1>")
    res.end()
});

server.listen(3000,()=>{
    console.log("server listen")
})