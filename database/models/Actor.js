module.exports = function(sequelize, dataTypes) {
    let alias = "Actor"; // Nomre de la tala
    let cols = { // Nombre las las colunmas
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
    }

    let config = { // Configuracion a la base de datos referenciando en nombre de la tabla y los timestamps en falso
        tableName: "actors",
        timestamps: false
    }

    // Configuracion de la tabla Genero con sequelize 
    let Actor = sequelize.define(alias, cols, config);

    // Configuracion de la relacion entre las diferentes tablas
    Actor.associate = function(models) {
        // belongsToMany hace referencia a que un actor puede tener muchas peliculas
        // belongsToMany es muchos a muchos
        Actor.belongsToMany(models.Pelicula, {
            // se renombra la relacion como peliculas
            as: "peliculas",
            // Relacion con tabla intermedia o tabla pivote
            through: "actor_movie",
            // Se explica cual es la llave foranea con la cual se relacionan
            foreignKey: "actor_id",
            // Se hace referencia a la relacion con otra llave foranea entro de la tabla
            otherKey: "movie_id",
            // si tiene timestamps (para actualizar o crear registro en las tablas esto esta por default)
            timestamps: false
        });
    }
    return Actor;
}