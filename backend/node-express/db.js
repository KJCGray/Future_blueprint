// 引入 mysql 模組
var mysql = require('mysql');

// 建立連線
// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "",
//   database: 'test'
// });

// 

var connection = mysql.createConnection({
  host: '140.136.151.140',
  user: 'test',
  password: "Futureblueprint1234",
  database: 'test'
});

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'test',
//   password: 'aG_uUZqU2h3VYrrV',
//   database: 'test'
// });



module.exports = connection;

