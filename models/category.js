import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  className:{type:String},
  classes:[String]
});

module.exports = mongoose.model('Category', categorySchema);
