var express = require('express');
var router = express.Router();

var User = require('../schema/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err,data){
    res.send(JSON.stringify(data));
  });
});

router.post('/add',function(req,res,next){
  var user = new User(req.body);
  console.log("Abt to add the user....");
  console.log(req.body);
  user.save(function(err,data){
    if(err){
      res.send(err);
    }else{
      res.send(JSON.stringify(data));
    }
  })
});

router.delete('/delete/:id',function(req,res,next){
  console.log("delete "+req.params.id);
  User.findByIdAndRemove(req.params.id, function(err) {
      res.send(req.params.id);

    // we have deleted the user

  });
});

router.put('/update',function(req,res,next){
  console.log("Update user "+req.body);
  var user = {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                empId:req.body.empId
              };



  User.findOneAndUpdate({_id:req.body._id},user,function(err,data){
    if(err) throw err;

    res.send(data);
  });
});

module.exports = router;
