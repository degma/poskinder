module.exports = (sequelize, type) => {
    return sequelize.define('variante', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        stock: type.INTEGER,
        activo: {
          defaultValue: true,
          type: type.BOOLEAN
        }
    })
}