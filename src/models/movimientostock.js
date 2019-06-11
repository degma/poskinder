module.exports = (sequelize, type) => {
    return sequelize.define('movimientostock', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cantidad: type.INTEGER,
        comentarios: type.STRING,
        activo: {
          defaultValue: true,
          type: type.BOOLEAN
        }
    })
}