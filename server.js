const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 3000
const {db,Guest,History} =require('./db')
app.use(cookieParser());

// set a cookie
app.use( function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    var randomNumber=Math.random().toString().substring(2,12)
    res.cookie('cookieName',randomNumber, { maxAge:7*24*60*60*1000,  httpOnly: true });
    let item=Guest.create({
         id:"Guest"+randomNumber.substring(0,5)
    })
  } 
  else
  {
    console.log('cookie exists', cookie);
  } 
  next(); 
});


app.use(express.static(__dirname + '/public'))
var search = require('scrape-youtube');
const fs = require('fs');
const ytdl = require('ytdl-core');


app.get('/sh',async (req,res)=>{
  let guestId=""
  if(req.cookies.cookieName){
     guestId="Guest"+ req.cookies.cookieName.toString().substring(0,5)
  }
 
        let item=await History.findAll({
          where:{
            guest_id: guestId
          }
        })
        console.log(item)
        res.send(item)
  
})



 app.get('/search',async(req,res)=>{
  search(req.url.split('?')[1], {
    limit : 150,
    type : "video"
  }).then(function(results){
    res.send(results)
    })
  })



app.get('/download',async(req,res)=>{
  let url='www.youtube.com/watch?v='+req.url.split('=')[1];
  
  console.log(url)
  console.log(req.cookies)
 
  ytdl.getInfo(url,  ( async(err,res1)=>{
    let res3=await res1; 
    let guestId=""
    if(req.cookies.cookieName){
       guestId="Guest"+ req.cookies.cookieName.toString().substring(0,5)
    }
    let item=await History.create({
      data:res3,
      guest_id: guestId
});
        res.send(res1);
         
  }))
})


 
 
console.log(port)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))