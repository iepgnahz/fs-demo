import Category from '../models/category';
export default class CategoryController {
  getAll(req, res, next) {
    Category.find({}, (err, docs) => {
      if (!err && docs) {
        res.send({categories: docs});
      } else {
        return next(err);
      }
    });
  }

  getOne(req, res, next) {
    let id = req.params.id;
    Category.findById(id,(err,doc)=>{
      if(!err && doc){
        res.send({category:doc})
      }else {
        return next(err);
      }
    })
  }

  addOne(req,res,next){
    let category = req.body.category;
    new Category(category).save((err,doc)=>{
      if(!err && doc){
        res.sendStatus(201)
      }else {
        return next(err);
      }
    })
  }

  deleteOne(req, res, next) {
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err)=>{
      if(!err){
        res.sendStatus(200)
      }else {
        return next(err);
      }
    })
  }

  updateOne(req, res, next) {
    let id = req.params.id;
    let category = req.body.category;
    Category.findByIdAndUpdate(id, category, (err) => {
      if (!err) {
        res.sendStatus(200)
      } else {
        return next(err);
      }
    });
  }
}

