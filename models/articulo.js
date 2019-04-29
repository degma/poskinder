module.exports = (sequelize, type) => {
    return sequelize.define('articulo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        tags: type.ARRAY(type.STRING),        
        activo: {
        defaultValue: true,
        type: type.BOOLEAN
        }
    })
}