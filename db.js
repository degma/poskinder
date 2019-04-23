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

const crearTablaUsuarios = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
        usuarios(
            "id" int PRIMARY KEY,
            "full_name" varchar,
            "email" varchar UNIQUE,
            "date_of_birth" varchar,
            "created_at" varchar,
            "admin" boolean
        );`
      pool.query(queryText)
      .then((res)=>{
          console.log("Tabla usuarios -> OK");
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      })
}



module.exports = {
    crearTablaUsuarios
}

require('make-runnable');