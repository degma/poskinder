import Sequelize from 'sequelize';
import UsuarioModel from './models/usuario'
import ArticuloModel from './models/articulo'
import GeneroModel from './models/genero'
import TalleModel from './models/talle'
import ColorModel from './models/color'
import CategoriaModel from './models/categoria'
import FabricanteModel from './models/fabricante'
import PrecioModel from './models/precio'
import ListaPrecioModel from './models/listaprecio'
import VarianteModel from './models/variante'
import MovimientoStockModel from './models/movimientostock'

var sequelize = null

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',    
    logging:  true //false
  })
  console.log(`Conectado a la BASE DE DATOS ${process.env.DATABASE_URL}`)
} else {
  // the application is executed on the local machine ... use mysql  
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
    console.log(`Conectado a la BASE DE DATOS ${process.env.DATABASE}`)
}


const Usuario = UsuarioModel(sequelize, Sequelize)
const ArticuloGenero = sequelize.define('articulo_genero', {})
const Articulo = ArticuloModel(sequelize, Sequelize)
const Genero = GeneroModel(sequelize, Sequelize)
const Talle = TalleModel(sequelize, Sequelize)
const Color = ColorModel(sequelize, Sequelize)
const Categoria = CategoriaModel(sequelize, Sequelize)
const Fabricante = FabricanteModel(sequelize, Sequelize)
const Variante = VarianteModel(sequelize, Sequelize)
const ListaPrecio = ListaPrecioModel(sequelize, Sequelize)
const Precio = PrecioModel(sequelize, Sequelize)
const MovimientoStock = MovimientoStockModel(sequelize, Sequelize)

Articulo.belongsToMany(Genero, { through: ArticuloGenero, unique: false })
Genero.belongsToMany(Articulo, { through: ArticuloGenero, unique: false })

Articulo.belongsToMany(ListaPrecio, { through: Precio, unique: false, foreignKey: 'articuloId' });
ListaPrecio.belongsToMany(Articulo, { through: Precio, unique: false, foreignKey: 'listaprecioId' });

Articulo.belongsTo(Usuario);
Articulo.belongsTo(Fabricante);
Articulo.belongsTo(Categoria);

Fabricante.hasMany(Articulo);

Precio.belongsTo(Articulo);
Precio.belongsTo(ListaPrecio);
Articulo.hasMany(Precio)
ListaPrecio.hasMany(Precio)

MovimientoStock.belongsTo(Usuario);
MovimientoStock.belongsTo(Variante);

Variante.belongsTo(Articulo);
Variante.belongsTo(Color);
Variante.belongsTo(Talle);

Categoria.belongsTo(Usuario);
Talle.belongsTo(Usuario);
Color.belongsTo(Usuario);
Genero.belongsTo(Usuario);
Precio.belongsTo(Usuario);
Variante.belongsTo(Usuario);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database ${process.env.DATABASE} => tables created!`)
  })

module.exports = {
  Usuario,
  Articulo,
  Genero,
  Categoria,
  Talle,
  Color,
  ListaPrecio,
  Precio,
  MovimientoStock,
  Fabricante,
  ArticuloGenero
}