module.exports = (sequelize, type) => {
    return sequelize.define('articulo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        descripcion: type.STRING,
        tags: type.ARRAY(Sequelize.TEXT),        
        activo: type.BOOLEAN
    })
}