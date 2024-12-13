var express = require('express');
var router = express.Router();
var promocionesModel = require ('../models/promocionesModel');

router.get('/', async function(req, res, next) {

  var promociones = await promocionesModel.getPromociones();
  res.render('promociones', (
    promociones
  ));
});

module.exports = router;