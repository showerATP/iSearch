var express = require('express');
var router = express.Router();

var Site = require('./../models/Site.js');

router.get('/', function(req, res, next) {
  Site.findAll(function(err, obj) {
    if (err) {
      res.send({
        'success': false,
        'err': err
      });
    } else {
      res.send(obj);
    }
  });
});

router.get('/:id', function(req, res, next) {
  Site.findById(req.params.id, function(err, obj) {
    if (err) {
      res.send({
        'success': false,
        'err': err
      });
    } else {
      res.send(obj);
    }
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var user = req.session.user;
  if (user.permission) {
    Site.save(req.body, function(err) {
      if (err) {
        res.send({
          'success': false,
          'err': err
        });
      } else {
        res.send({
          'success': true
        });
      }
    });
  } else {
    res.send({
      'success': false,
      'err': 'No permission'
    });
  }
});

router.delete('/:id', function(req, res, next) {
  var user = req.session.user;
  if (user.permission >= 20) {
    Site.deleteById(req.params.id, function(err) {
      if (err) {
        res.send({
          'success': false,
          'err': err
        });
      } else {
        res.send({
          'success': true
        });
      }
    });
  } else {
    res.send({
      'success': false,
      'err': 'No permission'
    });
  }
});


router.put('/:id', function(req, res, next) {
  var user = req.session.user;
  if (user.permission >= 20) {
    Site.updateById(req.params.id, req.body, function(err) {
      if (err) {
        res.send({
          'success': false,
          'err': err
        });
      } else {
        res.send({
          'success': true
        });
      }
    });
  } else {
    res.send({
      'success': false,
      'err': 'No permission'
    });
  }
});



module.exports = router;
