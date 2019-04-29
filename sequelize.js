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

const sequelize = new Sequelize( process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

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
Articulo.belongsTo(Usuario);
Articulo.belongsTo(Fabricante);
Articulo.belongsTo(Categoria);
MovimientoStock.belongsTo(Usuario);
MovimientoStock.belongsTo(Variante);
Variante.belongsTo(Articulo);
Variante.belongsTo(Color);
Variante.belongsTo(Talle);
Variante.belongsTo(Usuario);
Precio.belongsTo(ListaPrecio);
Precio.belongsTo(Articulo);
Categoria.belongsTo(Usuario);
Talle.belongsTo(Usuario);
Color.belongsTo(Usuario);
Genero.belongsTo(Usuario);
Precio.belongsTo(Usuario);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
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
    Fabricante
}