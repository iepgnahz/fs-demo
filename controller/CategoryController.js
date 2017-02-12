const Category = require('../model/category');
const async = require('async');
const constant = require('../minxin/constant');
const Item = require('../model/item');
class CategoryController{
  getAll(req, res, next) {
    async.series({
      category: (cb) => {
        Category.find(cb)
      },
      totalCount: (cb) => {
        Category.count(cb)
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const id = req.params.categoryId;
    Category.findById(id).exec((err, doc) => {
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
    const category = req.body;
    Category.create(category,(err,doc) => {
      if(err){
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri:`categories/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const id = req.params.categoryId;
    async.waterfall([
      (done)=>{
        Item.find({category:id},done)
      },
      (docs,done)=>{
        if(docs.length !== 0){
          done({items:docs});
        }else {
          Category.findByIdAndRemove(id,(err,doc)=>{
            done(err,doc)
          })
        }
      }
    ],(err,result)=>{
      if(err && !err.items){
        return next(err);
      }
      if(err && err.items.length !== 0){
        return res.sendStatus(constant.httpCode.BAD_REQUEST)
      }
      if(!result){
        return res.sendStatus(constant.httpCode.NOT_FOUND)
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT)
    });
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    const category = req.body;
    Category.findByIdAndUpdate(categoryId,category,(err,doc)=>{
      if(err){
        return next(err);
      }
      if(!doc){
        return res.sendStatus(constant.httpCode.NOT_FOUND)
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT)
    })
  }
}

module.exports = CategoryController;