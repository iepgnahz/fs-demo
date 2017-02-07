import mongoose from 'mongoose';
import config from 'config';
mongoose.connect(config.get('mongoUri'));
import mongoTools from './spec/support/fixture/mongo-tools';

mongoTools.refresh((err)=>{
  if(err){
    console.log(err,'刷新数据库数据失败');
  }else {
    console.log('刷新数据库数据成功');
  }
});