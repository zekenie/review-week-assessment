var mongoose = require('mongoose')
var _ = require('lodash')
var Task;
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  // setup schema here
  parent: { type: Schema.Types.ObjectId, ref: 'Task'},
  name: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  due: Date
  
});

//virtuals

TaskSchema.virtual('timeRemaining').get(function() {
  
})

TaskSchema.virtual('overdue').get(function() {
  
})

//methods

TaskSchema.methods.addChild = function(params) {
  
}

TaskSchema.methods.getChildren = function() {
  
}

TaskSchema.methods.getSiblings = function() {
  
}

Task = mongoose.model('Task', TaskSchema);


module.exports = Task;