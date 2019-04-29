module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        email: {
          type: type.STRING,
          unique: true
        },
        password: type.STRING,
        admin: type.BOOLEAN
    })
}