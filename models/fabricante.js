module.exports = (sequelize, type) => {
    return sequelize.define('fabricante', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        markup: type.INTEGER,
        descripcion: type.STRING,
        nombre_contacto: type.STRING,
        apellido_contacto: type.STRING,
        email_contacto: type.STRING,
        telefono_contacto: type.STRING,
        celular_contacto: type.STRING,
        website: type.STRING,
        calle: type.STRING,
        localidad: type.STRING,
        codigo_postal: type.STRING,
        notas: type.TEXT,
        activo: {
          type: type.BOOLEAN,
          defaultValue: true
        }
    })
}