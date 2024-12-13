var express = require("express");
var router = express.Router();
var promocionesModel = require("../../models/promocionesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// lista las promocones
router.get("/", async function (req, res, next) {
  var promociones = await promocionesModel.getPromociones();

  promociones = promociones.map((promocion) => {
    if (promocion.img_id) {
      const imagen = cloudinary.image(promocion.img_id, {
        width: 100,
        height: 100,
        crop: "fill",
      });
      return {
        ...promocion,
        imagen,
      };
    } else {
      return {
        ...promocion,
        imagen: "",
      };
    }
  });

  res.render("admin/promociones", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    promociones,
  });
});

//Elimnar un item de la lista
router.get("/eliminar/:id", async (req, res, next) => {
  const id = req.params.id;

  let promocion = await promocionesModel.getPromocionById(id);
  if (promocion.img_id){
    await(destroy(promocion.img_id));
  }

  await promocionesModel.deletePromocionesById(id);
  res.redirect("/admin/promociones");
});

//muestra form para agregar item promociones
router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout",
  });
});

//insertar datos en la tabla promociones
router.post("/agregar", async (req, res, next) => {
  try {
    var img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.titulo != "" &&
      req.body.descripcion != "" &&
      req.body.cuerpo != ""
    ) {
      await promocionesModel.insertPromocion({
        ...req.body,
        img_id,
      });

      res.redirect("/admin/promociones");
    } else {
      res.render("/admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/layout", {
      layout: "admin/layout",
      error: true,
      message: "No se cargo la promoción",
    });
  }
});

//modificar un item de la lista

router.get("/modificar/:id", async (req, res, next) => {
  var id = req.params.id;
  var promocion = await promocionesModel.getPromocionById(id);

  res.render("admin/modificar", {
    layout: "admin/layout",
    promocion,
  });
});

router.post("/modificar", async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_veja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_veja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_veja = true;
      }
    }
    if (borrar_img_veja && req.body.img_original) {
      await destroy(req.body.img_original);
    }

    var obj = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      img_id
    };

    console.log(obj); //ver si trae los datos
    await promocionesModel.modificarPromocionById(obj, req.body.id);
    res.redirect("/admin/promociones");
  } catch (error) {
    console.log(error);
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico la promoción",
    });
  }
});

module.exports = router;
