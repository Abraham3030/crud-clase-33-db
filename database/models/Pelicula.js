module.exports = function(sequelize, dataTypes) {
    let alias = "Pelicula"; // Nombre de la tala
    let cols = { // Nombre las las colunmas
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncement: true
        },
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }

    }

    let config = { // Configuracion a la base de datos referenciando en nombre de la tabla y los timestamps en falso
        tableName: "movies",
        timestamps: false
    }

    // Configuracion de la tabla Genero con sequelize 
    let Pelicula = sequelize.define(alias, cols, config);

    // Configuracion de la relacion entre las diferentes tablas
    Pelicula.associate = function(models) {
        // belongsTo hace referencia a que un pelicula tiene un genero
        // belongsTo relacion uno a muchos
        Pelicula.belongsTo(models.Genero, {
            // se renombra la relacion como peliculas
            as: "genero",
            // Se explica cual es la llave foranea con la cual se relacionan
            foreignKey: "genre_id"
        });

        // Otra relacion porque esta tablas tiene vias llaves foraneas
        Pelicula.belongsToMany(models.Actor, {
            // se renombra la relacion como peliculas
            as: "actores",
            // Relacion con tabla intermedia o tabla pivote
            through: "actor_movie",
            // Se explica cual es la llave foranea con la cual se relacionan
            foreignKey: "movie_id",
            // Se hace referencia a la relacion con otra llave foranea entro de la tabla
            otherKey: "actor_id",
            // si tiene timestamps (para actualizar o crear registro en las tablas esto esta por default)
            timestamps: false
        });
    }

    return Pelicula;
}