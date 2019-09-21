const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'remotemysql.com',
  user: '1WIGEltyb9',
  password: 'upLN6KnXla'
 
});
db.connect();
db.query(`CREATE TABLE IF NOT EXISTS contacts(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )`
  ,
  function(err) {
  if(err){
      console.log(err.stack);
  }
  }
);
db.end();



