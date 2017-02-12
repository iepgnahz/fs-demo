const UserService = require('../service/user/user-service');
const constant = require('../minxin/constant');
const userService = new UserService();
class UserController{
  login(req,res,next){
    const condition  = Object.assign({},req.body,{cookies:req.cookies},{next:next});
    userService.login(condition,(data)=>{
      if(data.status === constant.httpCode.OK){
        res.cookie('user',data.token)
      }
      return res.sendStatus(data.status)
    })

  }
}
module.exports = UserController;
