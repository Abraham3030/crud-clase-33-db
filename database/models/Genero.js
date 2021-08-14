module.exports = function(sequelize, dataTypes) {
    let alias = "Genero"; // Nomre de la tala
    let cols = { // Nombre las las colunmas
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncement: true
        },
        name: {
            type: dataTypes.STRING
        },

    }

    let config = { // Configuracion a la base de datos referenciando en nombre de la tabla y los timestamps en falso
        tableName: "genres",
        timestamps: false
    }

    // Configuracion de la tabla Genero con sequelize 
    let Genero = sequelize.define(alias, cols, config);

    // Configuracion de la relacion entre las diferentes tablas
    Genero.associate = function(models) {
        // hasMany hace referencia a que un genero puede tener muchas peliculas
        Genero.hasMany(models.Pelicula, {
            // se renombra la relacion como peliculas
            as: "peliculas",
            // Se explica cual es la llave foranea con la cual se relacionan
            foreignKey: "genre_id"
        });
    }

    return Genero;
}