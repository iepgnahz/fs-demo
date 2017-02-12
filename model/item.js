const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

const itemSchema = new Schema({
  category:{type: Schema.ObjectId, ref: 'Category'},
  name:String,
  price:Number
});

const item = mongoose.model('Item', itemSchema);
module.exports = item;
