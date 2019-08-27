const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  retry: {
    max: 10
  },
  storage: __dirname+'/tests2.db',
})


const User = db.define('user', {
  username:Sequelize.STRING(20),
  fullname:Sequelize.STRING(20),
  password:Sequelize.STRING(20),
  email:Sequelize.STRING(20),
})

const History = db.define('history',{
      data:{
       type: Sequelize.JSON()
      },
      guest_id:Sequelize.STRING(),
      
      
})
const Guest = db.define('guest', {
  id:{
    type: Sequelize.STRING,
    primaryKey: true,
  }
})
Guest.hasMany(History,{foreignKey: 'customer_id'});




db.sync(()=>
{
    console.log('working fine')
})
module.exports = {
db,History,Guest,User
}