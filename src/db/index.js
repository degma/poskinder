import Sequelize from 'sequelize';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  // gimme postgres, please!
  dialect: 'postgres'
});

export default {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object 
   */
  query(text, params) {
    return new Promise((resolve, reject) => {    
      pool.query(text, params)
        .then((res) => {        
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  },
  queryRaw(queryText) {
    return new Promise((resolve, reject) => {
      pool.query(queryText)
        .then((res) => {          
          console.log("Query ejecutada OK.");
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })      
    }) 
  }
}