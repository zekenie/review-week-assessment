var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var Article;
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  // setup schema here



});

// read up on methods/statics

Article = mongoose.model('Article', ArticleSchema);


module.exports = Article;


