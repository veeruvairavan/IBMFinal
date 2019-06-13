var express = require('express');
var router = express.Router();

var Task = require('../schema/Task.js');

/* GET Tasks listing. */
router.get('/', function(req, res, next) {
  Task.find(function(err,data){
    res.send(JSON.stringify(data));
  });
});

router.post('/add',function(req,res,next){
  var task = new Task(req.body);
  console.log("Abt to add the Tasks....");
  console.log(req.body);
  task.save(function(err,data){
    if(err){
      res.send(err);
    }else{
      res.send(JSON.stringify(data));
    }
  })
});

router.delete('/delete/:id',function(req,res,next){
  console.log("delete "+req.params.id);
  Task.findByIdAndRemove(req.params.id, function(err) {
      res.send(req.params.id);

    // we have deleted the Task

  });
});

router.put('/update',function(req,res,next){
  console.log("Update Task "+req.body);
  console.log("Parent "+req.body._parentId);
    console.log("Parent Task"+req.body.parentTask);
  var task = {
                task:req.body.task,
                isParentTask:req.body.isParentTask,
                parentTask:req.body.parentTask,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                status:req.body.status,
                priority:req.body.priority,
                parentId:req.body._parentId,
                status:req.body.status
              };



  Task.findOneAndUpdate({_id:req.body._id},task,function(err,data){
    if(err) throw err;

    res.send(data);
  });
});

module.exports = router;
