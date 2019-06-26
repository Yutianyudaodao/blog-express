var express = require('express');
var router = express.Router();
const {getlist,getDetail,newBlog,updataBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

/* GET home page. */
router.get('/list', function(req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const result = getlist(author,keyword)
  return result.then(listData=>{
      res.json(new SuccessModel(listData) ) 
  })
});

module.exports = router;
