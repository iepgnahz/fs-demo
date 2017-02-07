import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  goods:[{goodId:Schema.Types.ObjectId,count:Number}],
  total:Number
});

module.exports = mongoose.model('Cart', cartSchema);

