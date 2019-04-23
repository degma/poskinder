//db.js

const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'pos_kinder',
    password: 'xpsm1530',
    port: 5432,
})

console.log(pool)

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
          console.log(res);
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