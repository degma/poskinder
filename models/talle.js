module.exports = (sequelize, type) => {
    return sequelize.define('talle', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        activo: {
          defaultValue: true,
          type: type.BOOLEAN
        }
    })
}