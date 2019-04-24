import db from '../db/index';

const Color = {
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
      colores(nombre, fecha_creado)
      VALUES($1, $2)
      returning *`;
    
    const values = [
      req.body.nombre,
      new Date().toISOString()      
    ];
    console.log(values)

    try {            
      const { rows } = await db.query(createQuery, values);
      console.log("Categoria insertado OK! id:" + rows[0].nombre);      
      return res.status(201).send( rows[0]);
    } catch(error) {
      console.log(error)      
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
    console.log(req);
    const deleteQuery = 'DELETE FROM colores WHERE id=$1 returning *';
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

export default Color;