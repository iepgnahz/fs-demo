const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name:{type:String,unique:true},
  password:{type:Number,required:true}
});

const user = mongoose.model('User',userSchema);
module.exports = user;
