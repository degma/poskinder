import db from '../db/index';

const Genero = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async crear(req, res) {
    if (!req.body.nombre) {
      return res.status(400).send({'message': 'Verificar que no falten datos'});
    }
    
    const createQuery = `INSERT INTO
      generos(nombre, grupo_talle, fecha_creado)
      VALUES($1, $2, $3)
      returning *`;
    
    const values = [
      req.body.nombre,
      req.body.grupo_talle,
      new Date().toISOString()      
    ];

    try {            
      const { rows } = await db.query(createQuery, values);
      console.log("Categoria insertado OK! id:" + rows[0].nombre);      
      return res.status(201).send( rows[0]);
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
    
    const deleteQuery = 'DELETE FROM generos WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'no existe esa categoría'});
      }
      // AGREGAR if PARA VERIFICAR QUE NO EXISTAN ARTICULOS ASOCIADOS A LA CATEGORIA A BORRAR
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Genero;