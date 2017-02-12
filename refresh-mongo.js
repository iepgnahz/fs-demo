const mongoose = require( 'mongoose');
const config = require( 'config');
mongoose.connect(config.get('mongoUri'));
mongoose.Promise = global.Promise;

const mongoTools = require( './tool/fixture/mongo-tools');

mongoTools.refresh((err)=>{
  let status = 1;
  if(!err){
    status = 0;
    console.log('数据库刷新成功')
  }
  mongoose.connection.close(function() {
    process.exit(status);
  })
});