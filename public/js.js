$(()=>{
     if(window.localStorage.user!=null) 
      {
      $("#not_user").hide()
      $("#user").show() 
    }
    else {   
   let person;
   person = prompt("Please enter Username");
  $.get('/createdatabase',person,(res)=>{
        console.log(res)
      })
      window.localStorage.user=person;
    }

    function myFunction(x) {
      console.log("hello")
    x.classList.toggle("fa-thumbs-down");
  } 


  function fillVideos(x){
      let str=""
    for(let z of x){
      str+=`  <div class="card" id="card" >\
      <img class="card-img-top" id="cardimg" src="${z.thumbnail}">\
      <div class="card-body">\
        <h4 class="card-title">${z.title}</h4>\
       <button  link="${z.link}" class="btn btn-info " id="b2">Play</button> \
       <i id="icon"  link="${z.link}"  class="fa fa-thumbs-up"></i>\
      </div>
      `

    $('#result')
    .append(str)
    str="";

        
}
  }


  //fill trending songs
  $.get('/search',"new song",async (x)=>{
    $('#loading').hide()
        $('#result').empty()
        fillVideos(x)
         })
$('#getTrending').click(()=>{
  $('result').hide()
  $.get('/search',"trending song",async (x)=>{
    $('#loading').hide()
        $('#result').empty()
        fillVideos(x)
         })
})


  //get request from the youtube and fill the page with videos .
  $('#b1').click(()=>
  { $('#loading').show()
     $.get('/search',$('#i1').val(),async (x)=>{
      $('#loading').hide()
          $('#result').empty()
            fillVideos(x);
         })
 })

// trigger Submit button when Hit enter By the user.
 $('input').on('keyup',((ev)=>{
  $('#mySelect').empty()
  let a=0;
  let str="";
  str.sub(1,)

  $.get('/search',$('#i1').val(),(x)=>{
    for(let z of x){
      if(a++>5) break;
        $('#mySelect').append(`
          <option value="${z.title.substr(0,20)}">\
        `)
    }
})
    if(ev.key=="Enter"){
         $('#b1').click()
         $('#mySelect').empty()
    }
    }))
 $('input').on('change', function() {
  var value = $(this).val();
  $('#b1').click();
});


// fetech formats of video Quality.
  $(document).on('click',"#b2 ",async function(ev){
        
       $(this).css("background-color", "yellow");
       $.get('/download',$(this).attr('link'),async (x)=>{
         x=await x;
         console.log(x.formats[0].url+"vdgsvdgss")
         if(!x){
          $("#b2").click()
         }  
         
        
         let mp3;
        
        let arrayofmp3 =x.formats.reverse()
        arrayofmp3.forEach(element => {  
            if(element.audioBitrate===160||element.audioBitrate===64||element.audioBitrate===128) {
              
              mp3=element.url;
              
            }
         });
         let mp4=x.formats[0].url || 0;
         $(this).parent().find('a').empty()
           $(this).parent()
          .append(`\ 

         <a><button id="b2-videoplayer" link="${mp4}" class="btn btn-primary">HD 480P</button></a>
         
          `)
          $('#video-player').empty().hide()

          $('#player').empty().show().append(`
          <audio id="b2" style="width:95% ;height:50px" download="mp3.mp3" autoplay="autoplay" controls>
          <source src=${mp3} type="audio/ogg">
          Your browser does not support the audio element.
           </audio> 
          `)

       })
       $(this).css("background-color", "blue");
  }); 

$(document).on('click','#b2-videoplayer' ,((ev)=>{
  $('#player').empty().hide()
  $('#video-player').empty().hide() 
        $('#video-player').show().append(`
        <video width="320" height="240" autoplay="autoplay" controls>
        <source src=${$(ev.currentTarget).attr('link')} type="video/mp4">
      Your browser does not support the video tag.
      </video>
        `)
        $(ev.currentTarget).css("background-color", "blue");
}))


$("#getLikes").click(()=>{
  $('#result').empty()
  $.get('/getLiked',(res)=>{

        for(z of res)
        {
                  $('#result').append(`  <div class="card" id="card" >\
                  <img class="card-img-top" id="cardimg" src="${z.song.thumbnail}">\
                  <div class="card-body">\
                    <h4 class="card-title">${z.song.name}</h4>\
                   <button  link="${z.song.url}" class="btn btn-info " id="b2">Play</button> \
                  
                  </div>
                  
                  `
                  )
        }
})
})



$("#getHistory").click(()=>{
      $('#result').empty()
      $.get('/getHistory',(res)=>{
  
            for(z of res)
            {
                      $('#result').append(`  <div class="card" id="card" >\
                      <img class="card-img-top" id="cardimg" src="${z.song.thumbnail}">\
                      <div class="card-body">\
                        <h4 class="card-title">${z.song.name}</h4>\
                       <button  link="${z.song.url}" class="btn btn-info " id="b2">Play</button> \
                       <i id="icon"  link="${z.song.url}"  class="fa fa-thumbs-up"></i>\
                      </div>
                      
                      `
                      )
            }
 })


        

})
//store like when b2 clicked by the user
$(document).on('click','#icon' ,((ev)=>{
     console.log()
     ev.target.classList.toggle("fa-thumbs-down");
     $.get('/userlikevideo',$(ev.target).attr('link'),(res)=>{
            console.log("done")   
     })
}))


})

