module.exports = (sequelize, type) => {
    return sequelize.define('fabricante', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        telefono: type.STRING,
        nombre_contacto: type.STRING,
        notas: type.TEXT,
        activo: {
          type: type.BOOLEAN,
          defaultValue: true
        }
    })
}