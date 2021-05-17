const cors=require('cors');
const express=require('express');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const session=require('express-session');
var mysql = require('mysql');
var bcrypt=require('bcrypt');
const app=express();
app.use(cookieparser());
app.use(session({
  key:'user',
  secret:'yamaha',
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:60*60*60
  }
}))
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST'],
  credentials:true
}));
app.use(express.json());






var saltRounds=10;
// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash(password, salt, function(err, hash) {
//   // returns hash
//   console.log('yamaha==>',hash);

//   bcrypt.compare('yamaha', hash, function(err, result) {
//     console.log('result==>',result);
//   });

//   });
// });


var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})




    
app.get('/api/get',(req,res)=>{
  var get="SELECT  name , passsword from `sessiontest`";
  connection.query(get,(err,result)=>{
    res.send(result)
  })
})


    app.post('/api/insert',(req,res)=>{  
      const name = req.body.name;
      const password = req.body.password;
      bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(error, hash) {
        
    if(error){
          console.log(error)
          return;
        }
        else{
          console.log(hash)
          var que="INSERT INTO `sessiontest`(`Name`,`Password`) VALUES (?,?)";
          connection.query(que,[name,hash],(err1,result)=>{
            console.log(err1);
          })
        }
      //end of hash
      })
    // end of salt
    })
    // end of function
  });


app.get('/api/login',(req,res)=>{
  if(req.session.user){
res.send({user:req.session.user ,loggedIn : true})
  }
  else { 
    res.send({loggedIn : false})

  }
  // if(req.session.user){
//   res.send({loggedIn:true , user : req.session.user})
// }
// else { 
//   res.send({loggedIn:false})
// }

})


    app.post('/api/login',(req,res)=>{  
        const name = req.body.name;
        const password = req.body.password;
        
        var que="SELECT * FROM `sessiontest` where Name=?";
        connection.query(que,name,(err,result)=>{

          for(i=0;i<result.length;i++){
            
            bcrypt.compare(password, result[i].Password, function(err, answer) {
            console.log('result==>',result);
            if(answer){
              req.session.user = result;
              console.log('session',req.session.user)
              res.send(result)
            }
        });
          }
          // bcrypt.compare(password,result[0].Password,(error,response)=>{
          //   if(error){
          //     console.log(error)
          //   } 
          //   else{

          //     bcrypt.hash(password,saltRounds,(err1,res1)=>{
          //       console.log(res1)
          //     })

          //   }
          //  })
         
         
          // for(i=0;i<result.length;i++){
            //     if(name==result[i].Name){
            //         console.log('successfully with name');
            //     if(password==result[i].Password){
            //         console.log('successfull');
            //         console.log(result[i])
            //         res.send(result[i])
            //     }
            //     else{
            //         console.log('wrong password');
            //     }
            //     }
            // }
        })
      });
  

    app.listen(5000,()=>{
        console.log('the app is runnng on 5000')
    });
