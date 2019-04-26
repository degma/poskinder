module.exports = (sequelize, type) => {
    return sequelize.define('usuarios', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
        password: type.STRING,
        admin: type.BOOLEAN,
        createdAt: type.DATE
    })
}