const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  retry: {
    max: 10
  },
  storage: __dirname+'/tests.db',
})


const User = db.define('user', {
  username:Sequelize.STRING(20),
  fullname:Sequelize.STRING(20),
  password:Sequelize.STRING(20),
  email:Sequelize.STRING(20),
})

const History = db.define('history',{
      guest_id:Sequelize.STRING(),
      url:Sequelize.STRING(),
      image:Sequelize.STRING(),
      name:Sequelize.STRING()
      
      
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