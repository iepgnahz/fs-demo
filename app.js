const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const async = require('async');
const files = path.resolve(__dirname, './files');
const constant = require('./minxin/constant');

mongoose.connect(config.get('mongoUri'));
mongoose.Promise = require('bluebird');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());


app.get('/files/test1', (req, res, next) => {
  fs.stat(path.resolve(files, './test1.html'), {encoding: 'utf8'}, (err, stat) => {
    if (err) {
      return res.status(constant.httpCode.INTERNAL_SERVER_ERROR).send('该路径下不存在文件')
    }
    if (stat.isFile()) {
      return res.status(constant.httpCode.OK).send('该路径下是一个文件')
    }
    if (stat.isDirectory()) {
      return res.status(constant.httpCode.OK).send('该路径下是一个文件夹')
    }
    return res.status(constant.httpCode.OK).send('该路径下既不是文件也不是文件夹')
  })
});   //判断文件类型

app.get('/files/test2', (req, res, next) => {
  fs.rename(path.resolve(files, './destination'), path.resolve(__dirname, './definitionFiles/test1'), (err) => {
    res.status(constant.httpCode.OK).send(err);
  })
}); //文件的移动

app.get('/files/test3', (req, res, next) => {
  fs.readFile(path.resolve(files, './test1.html'), {encoding: 'utf8'}, (err, data) => {
    if (err) {
      return res.sendStatus(constant.httpCode.INTERNAL_SERVER_ERROR);
    }
    return res.status(constant.httpCode.OK).send(data)
  })
});  //读取文件内容

app.get('/files/test4', (req, res, next) => {
  async.waterfall([
    (done) => {
      fs.stat(path.resolve(files, './test1.html'), done)
    },
    (stat, done) => {
      if(stat){
        fs.unlink(path.resolve(files, './test1.html'),done)
      }else {
        done(true)
      }
    }
  ], (err) => {
    if(err){
      res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
    }else {
      res.status(constant.httpCode.NO_CONTENT).send('删除成功');
    }
  });
});  //删除文件



app.listen(config.get('httpPort'), () => {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;
