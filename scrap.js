const fs = require('fs');
const ytdl = require('ytdl-core');
ytdl.getInfo('www.youtube.com/watch?v=PAW_Gd3QVww',  (async(err,res)=>{
  await console.log(res)
}))
