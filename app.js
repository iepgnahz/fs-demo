import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import router from './router';
import bodyParser from 'body-parser';
mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

router(app);

app.use((err, req, res, next) => {
  if (err) {
    return next(err);
  }
  res.status(404).send('Not Found!');
});

app.use((err,req,res,next)=>{
  if(err){
    res.status(500).send(err.stack);
  }
});



app.listen(config.get('httpPort'), ()=> {
    console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});