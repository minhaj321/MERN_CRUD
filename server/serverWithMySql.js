const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
var mysql = require('mysql');

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());


var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})




// connection.query("SELECT * FROM `my table`", function (err, rows) {
  //   if (err)
  //   { throw err.message}
  //   else{
    //     console.log(rows)
    //   }
    // })
    
app.get('/api/get',(req,res)=>{
  var get="SELECT UCASE(Name) AS Name , Message from `my table`";
  connection.query(get,(err,result)=>{
    res.send(result)
  })
})


    app.post('/api/insert',(req,res)=>{  
      const name = req.body.name;
      const Msg = req.body.Msg;
  console.log(name,Msg)      
      var que="INSERT INTO `my table`(`Name`,`Message`) VALUES (?,?)";
      connection.query(que,[name,Msg],(err,result)=>{
        console.log(err);
      })
    });

      app.put('/api/update',(req,res)=>{  
        const name = req.body.name;
        const Msg = req.body.Msg;
    console.log(name,Msg)      
        var que="UPDATE `my table` SET Message = ? WHERE Name = ? ";
        connection.query(que,[Msg,name],(err,result)=>{
          console.log(err);
        })  
    })

    
    app.delete('/api/delete/:msg',(req,res)=>{  
      const Msg = req.params.msg;
      var que="DELETE FROM `my table` WHERE Message = ? ";
      connection.query(que,[Msg],(err,result)=>{
        console.log(err);
      })  
  })

    app.listen(5000,()=>{
        console.log('the app is runnng on 5000')
    });
    
    // connection.end()




// hardcoded value
// app.get('/',(req,res)=>{
//   res.send('App.js')  
// })
// connection.query("INSERT INTO `my table`(`Name`, `Message`) VALUES ('Mubha','Miss You')")
      
// Select with AlIAS
// var get="SELECT Name as name from `my table`";
    
// Select with Where Clause with < , > , >= , <= , != , AND , OR , NOT
// var get="SELECT * from `my table` where Name='Mubha'";
// var get="SELECT * from `my table` where NOT (Name='Mubha' or Name='Minhaj')";

// Select with BETWEEN , IN , LIKE , ORDER BY OPERATORS
// var get="SELECT * from `my table` where Name BETWEEN 'M' AND 'Z'";
// var get="SELECT * from `my table` where Name NOT IN('Minhaj','Mubha')";
// var get="SELECT * from `my table` where Name LIKE '_M%'";

// Select with DISTINCT , ORDER BY , LIMIT Keywords
// var get="SELECT DISTINCT Name from `my table`";
// var get="SELECT * from `my table` ORDER BY Name DESC";
// var get="SELECT * from `my table` lIMIT 3,2 ";
