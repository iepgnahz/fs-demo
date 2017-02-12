const Item = require('../model/item');
const async = require('async');
const constant = require('../minxin/constant');
class ItemController {
  getAll(req, res, next) {
    async.series({
      item: (cb) => {
        Item.find({}).populate('category').exec(cb)
      },
      totalCount: (cb) => {
        Item.count(cb)
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const id = req.params.itemId;
    Item.findById(id).populate('category').exec((err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    const item = req.body;
    Item.create(item,(err,doc) => {
      if(err){
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri:`items/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const id = req.params.itemId;
    Item.findByIdAndRemove(id, (err,doc) => {
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if(err){
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const id = req.params.itemId;
    const item = req.body;
    Item.findByIdAndUpdate(id, item, (err,doc) => {
      if(err){
        return next(err);
      }

      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = ItemController;