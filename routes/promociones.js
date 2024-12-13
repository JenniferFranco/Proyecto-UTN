var express = require('express');
var router = express.Router();
var promocionesModel = require ('../models/promocionesModel');
var cloudinary = require('cloudinary').v2;

router.get('/', async function(req, res, next) {

  var promociones = await promocionesModel.getPromociones();
  promociones = promociones.splice(0, 7);  // Limita a 7 promociones

  promociones = promociones.map(promocion => {
    if (promocion.img_id) {
      const imagen = cloudinary.url(promocion.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...promocion,
        imagen
      };
    } else {
      return {
        ...promocion,
        imagen: 'img/carpa.png'  // Imagen por defecto si no existe img_id
      };
    }
  });

  res.render('promociones', { promociones });  // Pasar promociones a la vista
});

module.exports = router;
