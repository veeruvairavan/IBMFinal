var express =  require("express");
var router = express.Router();

var ProjectTask =  require("../schema/projectTask.js");

router.post("/addProject",function(req,res){
  var projectTask = ProjectTask(req.body);
  //console.log(req.body);
  if(req.body._id){
    res.send("Entry already present");
  }
  projectTask.save(function(err,data){
    if(err){
      console.log("Error"+err);
      res.send(err);
    }else{
      console.log(data);
      res.send(JSON.stringify(data));
    }
  })
});

router.post("/addTask",function(req,res){
  //var projectTask = ProjectTask(req.body);
  console.log(req.body.task);

  ProjectTask.findOneAndUpdate({_id:req.body._id},
                     {$push:{tasks:req.body.task}},
                     {new:true},
  function(err,data){
    try{
      if(err){
        res.send(err);
      }else{
        res.send(JSON.stringify(data.tasks[data.tasks.length-1]));
      }
    }catch(error){
      res.send("Server error");
    }

  });
});

router.post("/updateProject",function(req,res){
  ProjectTask.findOneAndUpdate({_id:req.body._id},
                                {$set: {
                                  project:req.body.project,
                                  startDate:req.body.startDate,
                                  endDate:req.body.endDate,
                                  priority:req.body.priority,
                                  manager:req.body.manager
                                }},
                              function(err,data){
                                if(err){
                                  res.send(err);
                                }else{
                                  res.send(JSON.stringify(data));
                                }
                              });
});

router.post("/updateTask",function(req,res){
  console.log(req.body._id);
  console.log(req.body.task);
  ProjectTask.findOneAndUpdate({
                                _id:req.body._id,
                                'tasks._id':req.body._taskId
                              },
                              {
                                $set:{
                                  'tasks.$.task':req.body.task.task,
                                  'tasks.$._managerId':req.body.task._managerId,
                                  'tasks.$.parentTask':req.body.task.parentTask,
                                  'tasks.$.startDate':req.body.task.startDate,
                                  'tasks.$.endDate':req.body.task.endDate,
                                  'tasks.$.status':req.body.task.status

                                }
                              },
                              {
                                $new:true
                              },
                            function(err,data){
                              if(err){
                                res.send(err);
                              }else{
                                res.send(JSON.stringify(data));
                              }
                            });
});

router.get("/getProjects",function(req,res){
  ProjectTask.find(function(err,data){
    res.send(JSON.stringify(data));
  });
});

router.get("/getProject/:projectId",function(req,res){
  ProjectTask.findById(req.params.projectId,function(err,data){
    if(err){
      res.send(err);
    }else{
      res.send(JSON.stringify(data));
    }
  });
});

router.delete("/deleteTask/:projectId/:taskId",function(req,res){
  ProjectTask.findOneAndUpdate({_id:req.params.projectId},
                                {$pull:{tasks:{_id:req.params.taskId}}},
                                function(err,data){
                                  if(err){
                                    res.send(err);
                                  }else{
                                    res.send(JSON.stringify(data));
                                  }
                                });
});

router.delete('/deleteProject/:id',function(req,res,next){
  console.log("delete "+req.params.id);
  ProjectTask.findByIdAndRemove(req.params.id, function(err) {
      res.send(req.params.id);

    // we have deleted the user

  });
});

module.exports = router;
