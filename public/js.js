$(()=>{
  $('#loading').hide()
<<<<<<< HEAD
   console.log("hello world")
=======
   console.log("hello world") 
>>>>>>> 36f2a57... video---
  //get request from the youtube and fill the page with videos .
  $('#b1').click(()=>
  {
     $('#loading').show()
<<<<<<< HEAD
       console.log("10k")
     $.get('/search',$('#i1').val(),(x)=>{
         console.log(x);
          $('#result').empty()
          $('#loading').hide()
       for(let z of x){
          $('#result')
          .append(`
               <div class="card" id="card" >\
               <img class="card-img-top" id="cardimg" src="${z.thumbnail}">\
               <div class="card-body">\
                 <h4 class="card-title">${z.title}</h4>\
                <button  link="${z.link}" class="btn btn-info " id="b2">Play</button> 
               </div>`)
=======
     $.get('/search',$('#i1').val(),async (x)=>{
      
          $('#result').empty()
          $('#loading').hide()
           let str=""
          for(let z of x){
            str+=`  <div class="card" id="card" >\
            <img class="card-img-top" id="cardimg" src="${z.thumbnail}">\
            <div class="card-body">\
              <h4 class="card-title">${z.title}</h4>\
             <button  link="${z.link}" class="btn btn-info " id="b2">Play</button> 
            </div>`

          $('#result')
          .append(str)
          str="";
>>>>>>> 36f2a57... video---
              
     }
      
     })
  })

// triger Submit button when Hit enter By the user.
 $('input').on('keyup',((ev)=>{
   $('#options').hide()
    if(ev.key=="Enter"){
         $('#b1').click()
    }
    // Autocomplete later i will add.
    // $.get('/search',$('#i1').val(),(x)=>{
    //     for(let z of x){
    //         $('#options').append(`
    //           <a href="#" > ${z.title}</a>
    //         `)
    //     }
    // })
 }))

// fetech formats of video Quality.
  $(document).on('click',"#b2",function(ev){
<<<<<<< HEAD
    $('body').append('<div class="lds-ripple"><div></div><div></div></div>')
    console.log($(this).attr('link'));
=======
      console.log($(this).attr('link'))
>>>>>>> 36f2a57... video---
       $.get('/download',$(this).attr('link'),async (x)=>{
         x=await x;
         let mp4=x.formats[0].url ;
        
         let mp3;
         console.log(x.formats)
        let arrayofmp3 =x.formats.reverse()
        arrayofmp3.forEach(element => {  
            if(element.audioBitrate===160||element.audioBitrate===64||element.audioBitrate===128) {
              console.log(element)
              mp3=element.url;
              
            }
         });
         $(this).parent().find('a').empty()
           $(this).parent()
          .append(`\ 
<<<<<<< HEAD
          <a href=${mp4}> <button id="b2" class="btn btn-primary">HD 480P</button> </a>
         
          `)
=======
         <a><button id="b2-videoplayer" link="${mp4}" class="btn btn-primary">HD 480P</button></a>
         
          `)
          $('#video-player').empty().hide()
>>>>>>> 36f2a57... video---
          $('#player').empty().show().append(`
          <audio id="b2" style="width:95% ;height:50px" autoplay="autoplay" controls>
          <source src=${mp3} type="audio/ogg">
          Your browser does not support the audio element.
           </audio> 
          `)

       })
  }); 

<<<<<<< HEAD
=======
$(document).on('click','#b2-videoplayer' ,((ev)=>{
  $('#player').empty().hide()
  $('#video-player').empty().hide() 
       console.log()
        $('#video-player').show().append(`
        <video width="320" height="240" autoplay="autoplay" controls>
        <source src=${$(ev.currentTarget).attr('link')} type="video/mp4">
      Your browser does not support the video tag.
      </video>
        `)
}))


>>>>>>> 36f2a57... video---

})
