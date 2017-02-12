const async = require('async');
const constant = require('../../minxin/constant');
const User = require('../../model/user');
const uuid = require('uuid');
const Token = require('../../model/token');
class UserService {
  login(condition,callback) {
    const {name, password, cookies,next} = condition;
    async.waterfall([
      (done) => {
        User.findOne({name:name},done)
      },
      (user,done) => {
        if(!user){
          done(true,{status:constant.httpCode.NOT_FOUND})
        }
        if(user.password !== parseInt(password)){
          done(true,{status:constant.httpCode.FORBIDDEN})
        }
        done(null);
      },
      (done)=>{
        const cookieToken = cookies.user;
        const token = uuid.v4();
        Token.update({token:cookieToken},{$set:{token:token}},{upsert:true},(err,doc)=>{
          done(err,{status:constant.httpCode.OK,token})
        })
      }
    ], (err, result) => {
      if(err && !result.status){
        return next(err)
      }
      console.log(result);
      return callback(result);
    })
  }
}
module.exports = UserService;