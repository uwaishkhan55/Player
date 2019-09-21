var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database: 'uwaish'
});

let sql=`insert into user (name) values("faizan")`
   


connection.query(sql,(res,err)=>{
    console.log(res)
})

connection.connect(()=>{
    console.log("connected...")

    connection.end()
});
 
