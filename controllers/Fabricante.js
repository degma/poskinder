import db from '../db/index';

const Fabricante = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async crear(req, res) {
    if (!req.body.nombre) {
      return res.status(400).send({'message': 'El campo nombre del fabricante es obligatorio'});
    }
    
    const createQuery = `INSERT INTO
      fabricantes(nombre, nombre_contacto, telefono, direccion, notas, fecha_creado)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    
    const values = [
      req.body.nombre, 
      req.body.nombre_contacto || null, 
      req.body.telefono || null, 
      req.body.direccion || null, 
      req.body.notas || null,
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
    
    const deleteQuery = 'DELETE FROM fabricantes WHERE id=$1 returning *';
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

export default Fabricante;