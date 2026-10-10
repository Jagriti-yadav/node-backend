// function sum(a, b) {
//     return "Sum: = " + (a + b);
// }
// Promise.resolve().then(()=>{
//   console.log("inside promise")
// })
// console.log(sum(4,56))
// setTimeout(()=>{
//   console.log("inside setTimeout")
// },2000)
// console.log("function called")
// console.log("complete calling of promise and setTimeout")

http = require('http');
url = require("url");
const main = (req,res)=>{
  const urlPath = url.parse(req.url);
  const path = urlPath.pathname;
  if(path === "/"){
    res.writeHead(200, {"Content-Type": "text/html"});

    res.write("<h2>welcome to Node JS</h2>");
    res.write("automatic updating");
    res.end("starting on port 3000");
  }else if(path=== "/about"){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("this is about page");
  }else{
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("page not found");
  }
}
http.createServer((req, res) => {
  main(req, res);
})
.listen(3000, (error) => {
  if(error) {
    console.log("error in starting server");
  }
  console.log("server is running on port 3000");
});

//install nodemon
