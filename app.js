const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
mongoose.connect(config.get('mongoUri'));
mongoose.Promise = require('bluebird');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

router(app);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.stack);
  }
});

app.listen(config.get('httpPort'), () => {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;
