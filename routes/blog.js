var express = require('express');
var router = express.Router();
const {getlist,getDetail,newBlog,updataBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', (req, res, next) => {
  const author = req.query.author || '';
  const keyword = req.query.keyword || '';

  if(req.query.isadmin){
    author = req.session.username
  }
  const result = getlist(author,keyword)
  return result.then(listData=>{
      res.json(new SuccessModel(listData) ) 
  })
});

router.get('./detail', (req,res,next) => {
  const id = req.query.id;
  const result = getDetail(id);
  return result.then(detailData => {
    res.json(new SuccessModel(detailData))
  })
});

router.post('./new',loginCheck,(req,res,next)=>{
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

module.exports = router;
