const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 3000
app.use(cookieParser());
const {db,User,Songs,History,Likes}=require('./test')
app.use(express.static(__dirname + '/public'))
var search = require('scrape-youtube');
const fs = require('fs');
const ytdl = require('ytdl-core');



app.get('/getHistory',async (req,res)=>{


  let item = await User.findOne({
    where:{
        Name:req.cookies.username
    }
})
   console.log(item)
   let userId = item.id;
    item = await History.findAll({
    include:[{
        model:Songs
    }],
    where:{
         userId:userId
    }

})
console.log(item)
  res.send(item)

 })

 app.get('/getplaylist',async (req,res)=>{
  let user= req.url.split('?')[1]
  })

  app.get('/getLiked',async (req,res)=>{
    let item = await User.findOne({
      where:{
          Name:req.cookies.username
      }
  })
     console.log(item)
     let userId = item.id;
      item = await Likes.findAll({
      include:[{
          model:Songs
      }],
      where:{
           userId:userId
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



app.get('/download',(req,res)=>{
  let url='www.youtube.com/watch?v='+req.url.split('=')[1];
 ytdl.getInfo(url,async (err,res1)=>{
   console.log(req.cookies.username)
    let res3= await res1;
    if(req.cookies.username=='undefined') {
      return  res.send(res3)
    }
    
    let item = await User.findOne({
      where:{
          Name:req.cookies.username
      }
   })

   
  let UserId=item.id;
  
  let name =   res3.player_response.videoDetails.title;
  let url =  res3.video_url;
  let thumbnail= res3.player_response.videoDetails.thumbnail.thumbnails[0].url||"";


  let item2 = await Songs.findAll({
    where:{
        name:name
    }
})
 
if(item2.length==0)
{
  let item1=await Songs.create({
    name:name,
    url:url,
    thumbnail:thumbnail
})

  let item3 = await History.create({
        userId:UserId,
        songId:item1[0].id
  })
}else{
  let item5 = await History.destroy({
    where:{
         userId:UserId,
         songId:item2[0].id
    }
  })
  let item3 = await History.create({
    userId:UserId,
    songId:item2[0].id
})
}


           res.send(res1);
     })
})




//  app.get('/createdatabase',async (req,res)=>{
       
//          console.log(req.url.split('?')[1]);
//          let  para=req.url.split('?')[1];
//          let item=await User.findAll({
//            where:{
//              Name:para
//             }
//          })
//          if(item.length==1)
//          {
//           res.cookie('username',para,{maxAge: 7*24*60*60*1000})
//           console.log('old  User')
//               res.sendStatus(200)
//          }
//          else
//          {
//           res.cookie('username',para)
//                let item = User.create({Name:para})
//                console.log('New User')
//                res.sendStatus(200)
//          }
         
       
//  })



 app.get('getlikedvideos',(req,res)=>{
          
 })


 app.get('/userlikevideo',async(req,res)=>{
       let url="https://www."+req.url.split('userlikevideo?')[1].split('//')[1];
       let item9 = await Songs.findOne({
         where:{
          url:url
         }
       
       })


       let item = await User.findOne({
        where:{
            Name:req.cookies.username
        }
    
    })
  console.log(req.cookies.username)
    let UserId=item.id;


       if(!item9){
        console.log("start")
        ytdl.getInfo(url, async(err,res3)=>{
  
          
        let name =   res3.player_response.videoDetails.title;
        let url =  res3.video_url;
        let thumbnail= res3.player_response.videoDetails.thumbnail.thumbnails[0].url||"";
        let item1=await Songs.create({
          name:name,
          url:url,
          thumbnail:thumbnail
      })
      })
   }
   var item6 = await Songs.findOne({
     where:{
           url:url
     }
    
  })

    console.log("_________"+item6)
    let songId=item6.id
    let userId=UserId;
   console.log("---------"+songId+"_______"+userId)

        item=Likes.destroy({
         where:{
           userId:userId,
             songId:songId
         }
       })

       item=await Likes.create({
        userId:userId,
        songId:songId
       })
 })



 app.post('/signup',(req,res)=>{
  User.create({
    Name: req.body.username,
    Email: req.body.email,
    Password: req.body.password
  }).then((user) => {
    res.redirect('/login.html')
  }).catch((err) => {
      res.redirect('/singup.html')
  })
 })
 app.post('/login',async (req,res)=>{
      console.log(req.body.email+"====="
        +req.body.password)
        let item = await User.findOne({
              where:{
                     Name:req.body.username,
                     Password:req.body.password
              }
        })
        console.log(item)
        if(item){
          res.cookie('username',req.body.username,{maxAge: 7*24*60*60*1000});  
          res.redirect('/index.html') 
        }else{
             res.redirect('/login.html')
        }
})


//logout path is here

app.post('/logout',(req,res)=>{
  res.clearCookie("username");
  res.redirect('/index.html')
})
 
 
console.log(port)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))