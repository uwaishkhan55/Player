const express = require('express')
const app = express()
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))
var search = require('scrape-youtube');
const fs = require('fs');
const ytdl = require('ytdl-core');
 app.get('/search',async(req,res)=>{
  search(req.url.split('?')[1], {
    limit : 150,
    type : "video"
  }).then(function(results){
    res.send(results)
    })
  })
app.get('/download',(req,res)=>{
  console.log(req.url.split('=')[1])
  ytdl.getInfo('www.youtube.com/watch?v='+req.url.split('=')[1],  ( async (err,res1)=>{
  let res2=await res1;
  console.log(res2);
  res.send(res2)
    
  }))
})


 
 
console.log(port)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))