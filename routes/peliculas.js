var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController');

// Creación

router.get("/crear", peliculasController.crear);
router.post("/crear", peliculasController.guardar);

// listado
router.get("/lista", peliculasController.lista);

// detalle
router.get("/:id", peliculasController.detalle);

// editar pelicula
router.get("/editar/:id", peliculasController.editar);
router.post("/editar/:id", peliculasController.actualizar);

// borrar pelicula
router.post("/borrar/:id", peliculasController.borrar);
module.exports = router;