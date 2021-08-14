// Requerimos en la variable db la base de datos que creamos con sequelize
let db = require("../database/models")

let peliculasController = {
    crear: function(req, res) {
        /*  Vamos a llamar a la tabla Genero creada en los modelos
            y vamos a requerir el metodo findAll()
            de manero asicrona con .then()*/
        db.Genero.findAll()
            .then(function(generos) {
                return res.render('crearPelicula', {generos});

            });
    },
    guardar: function(req, res) {
        db.Pelicula.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        });

        re.redirect("/peliculas/lista");
    },
    lista: function(req, res) {
        db.Pelicula.findAll()
            .then(function(peliculas){
                res.render('listaPelicula', {peliculas})
            });
    },
    detalle: function(req,res) {
        db.Pelicula.findByPk(req.params.id, 
            {
                include: [{association: "genero"}, {association: "actores"}]
            })
            .then(function(pelicula){
                res.render("detallePelicula", {pelicula})
            })
    },
    editar: function(req, res) {
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
        let pedidoGeneros = db.Genero.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([pelicula, generos]) {
                res.render("editarPelicula", {pelicula, generos})
            })
    },
    actualizar: function(req, res) {
        db.Pelicula.update({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/peliculas/" + req.params.id);
    },
    borrar: function(req, res) {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/peliculas/lista");
    }
}

module.exports = peliculasController;