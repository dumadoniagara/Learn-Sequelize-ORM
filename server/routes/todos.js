var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET all todos */
router.get('/', function (req, res, next) {
  models.Todo.findAll({
    include: [{
      model: models.User
    }]
  }).then(function (todos) {
    res.json(todos)
  })
});

// Find One 
router.get('/:id', (req, res) => {
  models.Todo.findOne({
    where: {
      id: req.params.id
    }
  }).then(todo => {
    res.json(todo)
  })
})

// Post Todos
router.post('/', function (req, res) {
  models.Todo.create({
    title: req.body.title,
    UserId: req.body.userid
  }).then(todos => {
    res.json(todos)
  })
})

// update Todo
router.put('/:id', (req, res) => {
  models.Todo.update({
    title: req.body.title,
    complete: req.body.complete
  }, {
    returning: true,
    where: {
      id: req.params.id
    }
  }).then(todo => {
    res.json(todo)
  })
})

// Delete Todo
router.delete('/:id', (req, res) => {
  models.Todo.destroy({
    returning: true, //wajib di declare biar muncul
    where: {
      id: req.params.id
    }
  }).then(todo => {
    res.json(todo);
  })
})

module.exports = router;
