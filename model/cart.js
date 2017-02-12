const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: String,
  items: [
    {
      item: {type: Schema.Types.ObjectId, ref: 'Item'},
      count: Number
    }],

});
const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;

