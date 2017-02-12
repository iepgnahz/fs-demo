const {Router} = require('express');
const UserController = require('../../controller/UserController');

const router = Router();
const userCtrl = new UserController();

router.post('/login', userCtrl.login);


module.exports =  router;