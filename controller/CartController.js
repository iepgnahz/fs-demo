import Cart from '../models/cart';
export default class CartController {
  getAll(req, res, next) {
    Cart.find({}, (err, docs) => {
      if (!err && docs) {
        res.send({carts: docs});
      } else {
        return next(err);
      }
    });
  }

  getOne(req, res, next) {
    let id = req.params.id;
    Cart.findById(id,(err,doc)=>{
      if(!err && doc){
        res.send({carts:doc})
      }else {
        return next(err);
      }
    })
  }

  addOne(req,res,next){
    let cart = req.body.cart;
    new Cart(cart).save((err,doc)=>{
      if(!err && doc){
        res.sendStatus(201)
      }else {
        return next(err);
      }
    })
  }

  deleteOne(req, res, next) {
    let id = req.params.id;
    Cart.findByIdAndRemove(id, (err)=>{
      if(!err){
        res.sendStatus(200)
      }else {
        return next(err);
      }
    })
  }

  updateOne(req, res, next) {
    let id = req.params.id;
    let cart = req.body.cart;
    Cart.findByIdAndUpdate(id, cart, (err) => {
      if (!err) {
        res.sendStatus(200)
      } else {
        return next(err);
      }
    });
  }
}

