module.exports = (sequelize, type) => {
    return sequelize.define('categoria', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        activo: {
         type: type.BOOLEAN,
         defaultValue: true,
        }
    },
    {
      name: {
        singular: 'categoria',
        plural: 'categorias',
      },
    }
    )
}