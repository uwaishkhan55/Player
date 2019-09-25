const Sequelize = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'test99 .db'
  });

  const User = db.define('user', {
    // attributes
       Name: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    Email :
    {
      type: Sequelize.STRING,
      allowNull:false
    },
    Password :
    {
      type: Sequelize.STRING,
      allowNull:false
    }
});
const Songs = db.define('song', {
    // attributes
        name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    thumbnail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      }
});
User.hasMany(Songs);
Songs.belongsTo(User);
History=db.define('history',{
      userId:{
        type:Sequelize.NUMBER,
        allowNull:false
      },
      songId:{
          type:Sequelize.INTEGER,
          allowNull:false
      }
})
User.hasMany(History,{foreignKey: 'userId'});
History.belongsTo(User,{foreignKey: 'userId'})
Songs.hasMany(History,{foreignKey: 'songId'});
History.belongsTo(Songs,{foreignKey: 'songId'})
Likes=db.define('like',{
    userId:{
      type:Sequelize.NUMBER,
      allowNull:false
    },
    songId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
User.hasMany(Likes,{foreignKey: 'userId'});
Likes.belongsTo(User,{foreignKey: 'userId'})
Songs.hasMany(Likes,{foreignKey: 'songId'});
Likes.belongsTo(Songs,{foreignKey: 'songId'})

   db.sync()

  db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  module.exports={
      db,User,Songs,Likes,History
  }