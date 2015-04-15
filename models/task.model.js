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
  if(!this.due) return Infinity
  return this.due - new Date()
})

TaskSchema.virtual('overdue').get(function() {
  return !this.complete && this.timeRemaining < 0
})

//methods

TaskSchema.methods.addChild = function(params) {
  params = _.merge(params,{
    parent: this._id
  })
  return mongoose.model('Task').create(params)
}

TaskSchema.methods.getChildren = function() {
  return mongoose.model('Task').find({
    parent: this._id
  }).exec()
}

TaskSchema.methods.getSiblings = function() {
  return mongoose.model('Task').find({
    parent: this.parent,
    _id: { $ne: this._id }
  }).exec()
}


// ideas:
// - if all children are complete, task is complete
// - get children method
// - get siblings method
// - validation: task can't be due before its child

// read up on methods/statics

Task = mongoose.model('Task', TaskSchema);


module.exports = Task;


