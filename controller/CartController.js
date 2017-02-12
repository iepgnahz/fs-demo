const Cart = require('../model/cart');
const async = require('async');
const constant = require('../minxin/constant');
function loadUri(data) {
  data.items.forEach(item => {
    item.item = `items/${item.item}`
  })
}
class CartController {
  getAll(req, res, next) {
    async.series({
      cart: (cb) => {
        Cart.find((err,docs)=>{
          cb(err,docs.map(doc=>{
            const data = doc.toJSON();
            loadUri(data);
            return data
          }))
        })
      },
      totalCount: (cb) => {
        Cart.count(cb)
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const id = req.params.cartId;
    Cart.findById(id).exec((err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      const data = doc.toJSON();
      loadUri(data)   //TODO:返回的数据中任然存在在每个对象中的_id该如何去除
      res.status(constant.httpCode.OK).send(data);
    })
  }

  create(req, res, next) {
    const cart = req.body;
    Cart.create(cart, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const id = req.params.cartId;
    Cart.findByIdAndRemove(id, (err, doc) => {
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const id = req.params.cartId;
    const cart = req.body;
    Cart.findByIdAndUpdate(id, cart, (err, doc) => {
      if (err) {
        return next(err);
      }

      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = CartController;