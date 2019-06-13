var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  task:String,
  isParentTask:Boolean,
  parentTask:String,
  startDate:String,
  endDate:String,
  user:String,
  status:String,
  priority:Number,
  parentId:mongoose.Schema.Types.ObjectId
});

var Task = mongoose.model('Task',taskSchema);

module.exports = Task;
