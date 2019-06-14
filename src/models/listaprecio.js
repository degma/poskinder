module.exports = (sequelize, type) => {
    return sequelize.define('listaprecio', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        validaFrom: type.DATE,
        validaTO: type.DATE,
        activo: {
          defaultValue: true,
          type: type.BOOLEAN
        }
    })
}