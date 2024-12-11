var express = require('express');
var router = express.Router();

var promocionesModel = require('../../models/promocionesModel');

router.get ('/',  async function (req, res, next){
    var promociones = await promocionesModel.getPromociones();

    res.render('admin/promociones', {
        layout:'admin/layout',
        usuario: req.session.nombre,
        promociones
    });
});

    //Elimnar un item de la lista
    router.get('/eliminar/:id', async (req, res, next) => {
        const id = req.params.id;
        await promocionesModel.deletePromocionesById(id);
        res.redirect('/admin/promociones')
    });


module.exports = router;