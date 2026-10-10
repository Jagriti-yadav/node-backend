http = require('http');
fs = require('fs');
const main = (req,res)=>{
  const urlPath = new URL(req.url, `http://${req.headers.host}`);
  if(urlPath.pathname === '/readFile'){
    fs.readFile("index.js","utf8",(err,data)=>{
      if(err){
        console.log(err);
      
      }else{
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end("<pre>"+data+"</pre>");
      }
    });
  }
}
const server = http.createServer(main);
server.listen(3000, (error) => {
  if(error) {
    console.log("error in starting server");
  }
  console.log("server is running on port 3000");
})