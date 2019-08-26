const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  retry: {
    max: 10
  },
  storage: __dirname+'/tests2.db',
})

function generateMyId()
{
     return Math.floor(1000000000 + Math.random() * 900000000);
}

const User = db.define('user', {
  username:Sequelize.STRING(20),
  fullname:Sequelize.STRING(20),
  password:Sequelize.STRING(20),
  email:Sequelize.STRING(20),
})

const History = db.define('history',{
      data:Sequelize.STRING()
})
const Guest = db.define('guest', {
  username:Sequelize.STRING(20),
})
Guest.hasMany(History);




db.sync({force : true},()=>
{
    console.log('working fine')
})
module.exports = {
db,History,Guest,User
}