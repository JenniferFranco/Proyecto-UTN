var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

router.post('/', async(req, res, next) => {
  
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email= req.body.email;
  var consulta = req.body.consulta;

  var obj= {
    to: 'jennyfranco31.jf@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + '' + apellido + "se contacto a través de la web y quiere más información a este correo:" + email + ". <br> Además, hizo esta consulta: " + consulta 
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });

});