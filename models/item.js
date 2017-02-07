var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  classId:{type: Schema.Types.ObjectId, ref: 'Category'},
  barcode:{type:String,unique:true},
  name:{type:String},
  unit:{type:String},
  price:{type:Number}
});

module.exports = mongoose.model('Item', itemSchema);

