
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})
connection.connect()
connection.query("INSERT INTO `my table`(`Name`, `Message`) VALUES ('Mubha','Miss You')")

connection.query("SELECT `Name`, `Message`, `Time` FROM `my table`", function (err, rows, fields) {

  if (err) throw err

  console.log('The solution is: ', rows)
})


connection.end()