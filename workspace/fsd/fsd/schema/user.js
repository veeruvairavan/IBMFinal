var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName:String,
  lastName:String,
  empId:{type:Number, unique:true}
});

var User = mongoose.model('User',userSchema);

module.exports = User;
