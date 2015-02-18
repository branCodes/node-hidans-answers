var mongoose = require("mongoose");

var QuestionSchema = mongoose.Schema({
  title: {type: String, require: true},
  description: String
}); 

module.exports = mongoose.model('Question', QuestionSchema);