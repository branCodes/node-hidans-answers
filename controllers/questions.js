var Question = require("../models/question");

module.exports = function(app) {

  app.get("/questions/new", function(req, res) {
    res.render("questions/new");
  });

  app.post("/questions", function(req, res) {
    var question = new Question({
      title: req.body.title,
      description: req.body.description
    });

    question.save(function(error, the_question){
      if(error) {
        res.render("questions/new");
      } else {
        res.redirect("/questions/" + the_question.id);
      }
    });
  }); 

  app.get("/questions/:id", function(req, res){ 
    Question.findById(req.params.id, function(error, question){
      if(!question) {
        res.render("404", {status: 404});
      } else {
        if(!error) {
          res.render("questions/show", {question: question});
        } else {
          res.render("500", {status: 500});
        }
      }
    });
  }); 

  app.delete('/questions/:id', function(req, res){
    Question.findById(req.params.id, function(error, question) {
      if (!question) {
        res.render('404', { status: 404 });
      } else {
        if (!error) {
          question.remove(function(err) {
            if (!err) {
              res.redirect('/');
            } else {
              res.render('500', { status: 500 });
            }
          });
        } else {
          res.render('500', { status: 500 });
        }
      }
    });
  });
}