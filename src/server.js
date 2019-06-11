import express from 'express';
import dotenv from 'dotenv';
import "@babel/polyfill";
import Auth from './middleware/Auth';
import cors from 'cors';
import UsuarioController from './controllers/Usuario';
import CategoriaController from './controllers/Categoria';
import ColorController from './controllers/Color';
import FabricanteController from './controllers/Fabricante';
import GeneroController from './controllers/Genero';
import TalleController from './controllers/Talle';
import ArticuloController from './controllers/Articulo';
import ListaPrecioController from './controllers/ListaPrecio';

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'working!'});
});

//usuarios
app.post('/api/v1/usuario', UsuarioController.crear);
app.post('/api/v1/usuario/login',UsuarioController.login);
app.delete('/api/v1/usuario/me', Auth.verifyToken, UsuarioController.delete);

//categorias
app.post('/api/v1/categoria', Auth.verifyToken, CategoriaController.crear);
app.get('/api/v1/categoria', CategoriaController.getAll);
app.put('/api/v1/categoria/:id', Auth.verifyToken, CategoriaController.editar);
app.delete('/api/v1/categoria/:id', Auth.verifyToken, CategoriaController.eliminar);

//lista precio
app.post('/api/v1/listaprecio', Auth.verifyToken, ListaPrecioController.crear);
app.get('/api/v1/listaprecio/current', ListaPrecioController.getCurrent);
app.get('/api/v1/listaprecio/', ListaPrecioController.getAll);
app.put('/api/v1/listaprecio/:id', Auth.verifyToken, ListaPrecioController.editar);
app.delete('/api/v1/listaprecio/:id', Auth.verifyToken, ListaPrecioController.eliminar);


//colores
app.post('/api/v1/color', Auth.verifyToken, ColorController.crear);
app.put('/api/v1/color/:id', Auth.verifyToken, ColorController.editar);
app.delete('/api/v1/color/:id', Auth.verifyToken, ColorController.eliminar);

//fabricantes
app.post('/api/v1/fabricante', Auth.verifyToken, FabricanteController.crear);
app.get('/api/v1/fabricante', FabricanteController.getAll);
app.put('/api/v1/fabricante/:id', Auth.verifyToken, FabricanteController.editar);
app.delete('/api/v1/fabricante/:id', Auth.verifyToken, FabricanteController.eliminar);

//generos
app.post('/api/v1/genero', Auth.verifyToken, GeneroController.crear);
app.get('/api/v1/genero', GeneroController.getAll);
app.delete('/api/v1/genero/:id', Auth.verifyToken, GeneroController.eliminar);

//talles
app.post('/api/v1/talle', Auth.verifyToken, TalleController.crear);
app.delete('/api/v1/talle/:id', Auth.verifyToken, TalleController.eliminar);


//articulos
app.post('/api/v1/articulo',  ArticuloController.crear);
app.put('/api/v1/articulo/', Auth.verifyToken, ArticuloController.editar);
app.get('/api/v1/articulo/:id', Auth.verifyToken, ArticuloController.getOne);
app.get('/api/v1/articulo/', ArticuloController.getAll);
app.delete('/api/v1/articulo/:id', Auth.verifyToken, ArticuloController.eliminar);

//Stock
//crear variantes, track del stock

app.listen(process.env.PORT || 3000)

console.log('Aplicación ejecutandose en el puerto:', process.env.PORT || 3000);