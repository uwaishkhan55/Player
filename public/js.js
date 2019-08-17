$(()=>{
  $('#loading').hide()

  //get request from the youtube and fill the page with videos .
  $('#b1').click(()=>
  {
     $('#loading').show()

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

      console.log($(this).attr('link'))

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

         <a><button id="b2-videoplayer" link="${mp4}" class="btn btn-primary">HD 480P</button></a>
         
          `)
          $('#video-player').empty().hide()

          $('#player').empty().show().append(`
          <audio id="b2" style="width:95% ;height:50px" autoplay="autoplay" controls>
          <source src=${mp3} type="audio/ogg">
          Your browser does not support the audio element.
           </audio> 
          `)

       })
  }); 


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




})

