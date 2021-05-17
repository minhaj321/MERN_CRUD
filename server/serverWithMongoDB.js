const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/google',
 {useCreateIndex:true , useNewUrlParser: true,useUnifiedTopology: true}
);

const connection=mongoose.connection;

connection.once('open',()=>{
console.log('google');
})

const foodSchema = mongoose.Schema({
    foodName : String,
    days:Number
})

const food=mongoose.model('fruits',foodSchema);

app.get('/',(req,res)=>{
    food.find().limit(2).skip(2).sort({'foodName':1}).then((response)=>res.json(response)).catch((err)=>console.log(err));
})

app.delete('/:id',(req,res)=>{
    food.remove({_id:req.params.id}, function(err) {
        if (!err) {
                console.log('no error');
        }
        else {
            console.log(err.message)
        }
    })
})

app.put('/',(req,res)=>{
    food.updateOne({_id:req.body.id},{$set:{foodName:req.body.name}})
    .then((response)=>console.log(response)).catch((err)=>console.log(err));
    console.log(req.body)
})




app.post('/',(req,res)=>{
    console.log(req.body)
    const newData=new food({
        foodName : req.body.foodName,
        days : req.body.days
    })
    newData.save();
    console.log(newData)
})

app.listen(3001,()=>{
    console.log('the app is runnng on 3001')
});







// conditional Getting
// food.find({foodName:'Banana'}).then((response)=>res.json(response)).catch((err)=>console.log(err));

// conditional Getting with $lt , $gt ,$lte , $gte , $ne
// food.find({days : { $gt:4 }}).then((response)=>res.json(response)).catch((err)=>console.log(err));

// conditional Getting with $or , $and
// food.find({ $or :[{foodName:'Banana'},{days:2}] }).then((response)=>res.json(response)).catch((err)=>console.log(err));

// conditional Getting with limit , skip and sort functions
// food.find().limit(2).skip(2).sort({'foodName':1}).then((response)=>res.json(response)).catch((err)=>console.log(err));
