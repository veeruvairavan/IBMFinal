var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectTaskSchema = new Schema({
  project:String,
  startDate:String,
  endDate:String,
  priority:Number,
  manager:String,
  _managerId:mongoose.Schema.Types.ObjectId,
  tasks:[
    {
      task:String,
      parentTask:String,
      startDate:String,
      endDate:String,
      priority:Number,
      _parentId:{type:mongoose.Schema.Types.ObjectId, required:false},
      status:String
    }
  ]
});


var ProjectTask = mongoose.model("ProjectTask",projectTaskSchema);

module.exports = ProjectTask;
