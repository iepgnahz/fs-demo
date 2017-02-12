const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token:String
});

const token = mongoose.model('Token',tokenSchema);
module.exports = token;

