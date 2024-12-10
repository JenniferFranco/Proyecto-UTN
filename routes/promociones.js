var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('promociones', { title: 'Express' });
});

module.exports = router;