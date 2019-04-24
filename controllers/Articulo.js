import db from '../db';
import Helper from './Helper';

const Articulo = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async crear(req, res) {
    if (!req.body.nombre || !req.body.id_fabricante || !req.body.id_art_genero || !req.body.id_categoria) {
      return res.status(400).send({'message': 'Verificar que no falten datos'});
    }
    
    const createQuery = `INSERT INTO
      usuarios(nombre, descripcion, id_fabricante, id_art_generos, id_categoria, tags, estado, fecha_creado, fecha_modificado, id_usuario)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    
    const values = [
      req.body.nombre,
      req.body.descripcion,
      req.body.id_fabricante,
      req.body.id_art_generos,
      req.body.id_categoria,
      req.body.tags,
      req.body.estado,
      new Date().toISOString(),
      new Date().toISOString(),
      req.body.estado
    ];

    try {      
      const { rows } = await db.query(createQuery, values);
      console.log("Articulo insertado OK! id:" + rows[0].id);      
      return res.status(201).send({ token });
    } catch(error) {      
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  
  async eliminar(req, res) {
    const deleteQuery = 'DELETE FROM articulos WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Articulo;