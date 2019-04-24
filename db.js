//db.js

const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


pool.on('connect', () => {
    console.log('Connected to de DB!')
});


//Tabla de Usuarios

const crearTablaUsuarios = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        usuarios(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "email" varchar UNIQUE,
            "fecha_creado" date,
            "admin" boolean
        );`
    await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla usuarios -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de articulos

const crearTablaArticulos = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        articulos(
            "id" BIGSERIAL PRIMARY KEY,
            "nombre" varchar,
            "descripcion" varchar,
            "id_fabricante" int,
            "id_art_generos" int,
            "id_categoria" int,
            "tags" varchar[],
            "estado" varchar,
            "fecha_creado" timestamp,
            "fecha_modificado" timestamp,
            "id_usuario" int
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla articulos -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de variantes

const crearTablaVariantes = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        variantes(
            "id" SERIAL PRIMARY KEY,
            "id_articulo" int,
            "id_talle" int,
            "id_color" int,
            "stock" int
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla variantes -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de movimientos_stock

const crearTablaMovimientosStock = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        movimientos_stock(
            "id" SERIAL PRIMARY KEY,
            "id_variante" int,
            "cantidad" int,
            "descripcion" varchar,
            "usuario" int,
            "fecha" timestamp
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla movimientos_stock -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de fabricantes

const crearTablaFabricantes = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        fabricantes(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "nombre_contacto" varchar,
            "telefono" varchar,
            "direccion" varchar,
            "notas" text
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla fabricantes -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de generos

const crearTablaGeneros = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        generos(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "fecha_creado" date,
            "grupo_talle" varchar
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla generos -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}


//Tabla de art_generos

const crearTablaArtGeneros = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        art_genero(
            "id" SERIAL PRIMARY KEY,
            "id_articulo" int,
            "id_genero" int
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla art_genero -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de Categorias

const crearTablaCategorias = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        categorias(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "fecha_creado" date
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla categorias -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de talles

const crearTablaTalles = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        talles(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "grupo_talle" varchar
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla talles -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de colores

const crearTablaColores = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        colores(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla colores -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

//Tabla de Lista Precios

const crearTablaListaPrecios = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        listaprecios(
            "id" SERIAL PRIMARY KEY,
            "nombre" varchar,
            "valida_desde" date,
            "valida_hasta" date,
            "fecha_creado" date,
            "activo" boolean
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla listaprecios -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}


const crearTablaPrecios = async () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        precios(
            "id" SERIAL PRIMARY KEY,
            "id_articulo" int,
            "id_listaprecios" int,
            "precio" float,
            "fecha_creado" timestamp,
            "fecha_modificado" timestamp
        );`
      await pool.query(queryText)
      .then((res)=>{
          console.log("Tabla precios -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

const crearIndices = async () => {
    const queryText = 
    `ALTER TABLE "articulos" ADD FOREIGN KEY ("id_fabricante") REFERENCES "fabricantes" ("id");
    ALTER TABLE "articulos" ADD FOREIGN KEY ("id_art_generos") REFERENCES "art_genero" ("id");
    ALTER TABLE "articulos" ADD FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id");
    ALTER TABLE "articulos" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");
    ALTER TABLE "variantes" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");
    ALTER TABLE "variantes" ADD FOREIGN KEY ("id_talle") REFERENCES "talles" ("id");
    ALTER TABLE "variantes" ADD FOREIGN KEY ("id_color") REFERENCES "colores" ("id");
    ALTER TABLE "movimientos_stock" ADD FOREIGN KEY ("id_variante") REFERENCES "variantes" ("id");
    ALTER TABLE "movimientos_stock" ADD FOREIGN KEY ("usuario") REFERENCES "usuarios" ("id");
    ALTER TABLE "art_genero" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");
    ALTER TABLE "art_genero" ADD FOREIGN KEY ("id_genero") REFERENCES "generos" ("id");
    ALTER TABLE "precios" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");
    ALTER TABLE "precios" ADD FOREIGN KEY ("id_listaprecios") REFERENCES "listaprecios" ("id");
    `
      await pool.query(queryText)
      .then((res)=>{
          console.log("Indices -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}

const crearTodo = () => {
    crearTablaArticulos();
    crearTablaUsuarios();
    crearTablaVariantes();
    crearTablaMovimientosStock();
    crearTablaFabricantes();
    crearTablaGeneros();
    crearTablaTalles();
    crearTablaArtGeneros();
    crearTablaCategorias();
    crearTablaListaPrecios();
    crearTablaPrecios();
    crearTablaColores();
    crearIndices();

}

module.exports = {
    crearTablaUsuarios,
    crearTablaArticulos,
    crearTablaMovimientosStock,
    crearTablaFabricantes,
    crearTablaGeneros,
    crearTablaArtGeneros,
    crearTablaCategorias,
    crearTablaListaPrecios,
    crearTablaPrecios,
    crearTablaColores,
    crearTablaTalles,
    crearIndices,
    crearTodo,
}

require('make-runnable');