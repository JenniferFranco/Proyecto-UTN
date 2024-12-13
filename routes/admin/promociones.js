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

//muestra form para agregar item promociones
router.get('/agregar', (req, res, next) => {
    res.render ('admin/agregar',{
        layout: 'admin/layout'
    });
});


//insertar datos en la tabla promociones
router.post ('/agregar', async (req, res, next) => {
    try{
        if (req.body.titulo != "" && req.body.descripcion != "" && req.body.cuerpo != "")  {
            await promocionesModel.insertPromocion(req.body);

            res.redirect('/admin/promociones');
        } else {
            res.render ('/admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch(error){
        console.log(error)
        res.render('admin/layout', {
            layout:'admin/layout',
            error: true,
            message: 'No se cargo la promoción'
        })
    }
});

router.get ('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var promocion = await promocionesModel.getPromocionById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        promocion
    })
});

router.post ('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        }

        console.log(obj) //ver si trae los datos
        await promocionesModel.modificarPromocionById(obj, req.body.id)
        res.redirect('/admin/promociones');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la promoción'
        })
    }
});


module.exports = router;