//get,put,delete,post and types of url
//interview question: can u create a data using get and post
//get me data url me merge ho jata h , which is not secure. only 2mb data can be send only
//wiil it create any error if i do not write delete code in get,put,post,delete
//middleware = works between req and res , a special function


const express = require('express');
const app = express();


//url parameters
app.get('/student/:sid/branch/:bname',(req,res)=>{
  const sid = req.params.sid;
  const bname = req.params.bname;
  res.send('welcome to get request sid: '+sid+" branch name : "+ bname);
});


//query string - localhost:3000/product?pid=100&pname=mobile
app.get('/product',(req,res)=>{
  const pid = req.query.pid;
  const pname = req.query.pname;
  res.send('welcome to get request pid: '+pid+" pranch name : "+ pname);
});


//post me - url parameter use hoga (query string nhi use hogi)
app.post('/',(req,res)=>{
  res.send('welcome to post request');
});

app.put('/',(req,res)=>{
  res.send('welcome to put request');
});
app.delete('/',(req,res)=>{
  res.send('welcome to delete request');
});

app.listen(3000,(err)=>{
  if(err){
    console.log(err.message);
  }
})