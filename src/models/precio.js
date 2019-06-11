module.exports = (sequelize, type) => {
    return sequelize.define('precio', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        precio: type.FLOAT,
        activo: {
          defaultValue: true,
          type: type.BOOLEAN
        }
    })
}