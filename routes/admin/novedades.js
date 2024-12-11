var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');

router.get ('/',  async function (req, res, next){
    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout:'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

    //Elimnar un item de la lista
    router.get('/elimnar/id', async (req, res, next) => {
        const id = req.params.id;
        await novedadesModel.deleteNovedadesById(id);
        res.redirect('/admin/novedades')
    });


module.exports = router;