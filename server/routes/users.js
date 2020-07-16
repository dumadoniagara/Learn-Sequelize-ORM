var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET users listing with associate. */
router.get('/', function (req, res, next) {
  models.User.findAll({
    include: [{ // join-joinan 
      model: models.Todo
    }]
  }).then(function (user) {
    res.json(user);
  }).catch(error => {
    console.log(error)
  })
});

router.post('/', function (req, res, next) {
  // User dari model-name User 
  models.User.create({
    email: req.body.email
  }).then((user) => {
    res.json(user);
  })
});

module.exports = router;
