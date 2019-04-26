import express from 'express';
import dotenv from 'dotenv';
import "@babel/polyfill";
import Auth from './middleware/Auth';

import Usuario from './controllers/Usuario';
import Categoria from './controllers/Categoria';
import Color from './controllers/Color';
import Fabricante from './controllers/Fabricante';
import Genero from './controllers/Genero';
import Talle from './controllers/Talle';
import Articulo from './controllers/Articulo';

dotenv.config();

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'working!'});
});

// app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
// app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
// app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
// app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
// app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);

//usuarios
app.post('/api/v1/users', Usuario.crear);
app.post('/api/v1/users/login',Usuario.login);
app.delete('/api/v1/users/me', Auth.verifyToken, Usuario.delete);

//categorias
app.post('/api/v1/categoria', Auth.verifyToken, Categoria.crear);
app.delete('/api/v1/categoria/:id', Auth.verifyToken, Categoria.eliminar);

//colores
app.post('/api/v1/color', Auth.verifyToken, Color.crear);
app.delete('/api/v1/color/:id', Auth.verifyToken, Color.eliminar);

//fabricantes
app.post('/api/v1/fabricante', Auth.verifyToken, Fabricante.crear);
app.delete('/api/v1/fabricante/:id', Auth.verifyToken, Fabricante.eliminar);

//generos
app.post('/api/v1/genero', Auth.verifyToken, Genero.crear);
app.delete('/api/v1/genero/:id', Auth.verifyToken, Genero.eliminar);

//talles
app.post('/api/v1/talle', Auth.verifyToken, Talle.crear);
app.delete('/api/v1/talle/:id', Auth.verifyToken, Talle.eliminar);


//articulos
//crear, eliminar
app.post('/api/v1/articulo', Auth.verifyToken, Articulo.crear);
app.put('/api/v1/articulo/:id', Auth.verifyToken, Articulo.editar);
app.get('/api/v1/articulo/:id', Auth.verifyToken, Articulo.getOne);
app.get('/api/v1/articulo/', Auth.verifyToken, Articulo.getAll);
app.delete('/api/v1/articulo/:id', Auth.verifyToken, Articulo.eliminar);

//Stock
//crear variantes, track del stock

app.listen(process.env.PORT || 3000)

console.log('Aplicación ejecutandose en el puerto:', process.env.PORT || 3000);