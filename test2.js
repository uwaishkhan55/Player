const {User,Songs }=require('./test')
let item = User.findAll({
    where:{
        
    }
}).then(()=>{
    console.log(item[0])
})

