const mongoose=require('mongoose');

const foodSchema= new mongoose.Schema({
    foodName : String,
    days:Number
})

const food=mongoose.model('fooddata',foodSchema);
module.exports=food;