import db from '../db/index';
import Usuario from '../models/usuario';

const ArticuloController = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async crear(req, res) {
    if (!req.body.nombre || !req.body.id_fabricante || !req.body.id_genero || !req.body.id_categoria) {
      return res.status(400).send({ 'message': 'Verificar que no falten datos' });
    }

    const createQuery = `INSERT INTO
      articulos(nombre, descripcion, id_fabricante, id_categoria, tags, estado, fecha_creado, fecha_modificado, id_usuario)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;

    const values = [
      req.body.nombre,
      req.body.descripcion || null,
      req.body.id_fabricante,
      req.body.id_categoria,
      req.body.tags || null,
      req.body.estado || "activo",
      new Date().toISOString(),
      new Date().toISOString(),
      req.user.id
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      console.log("Articulo insertado OK! id:" + rows[0].id);
      //Agrego los generos
      let query = req.body.id_genero.reduce((txt, genero) => {
        genero = "INSERT INTO art_genero(id_articulo, id_genero) values (" + rows[0].id + " , " + genero + "); "
        return txt + genero
      }, "");
      await db.queryRaw(query);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Traer Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getOne(req, res) {
    const getQuery = `SELECT art.id, art.nombre, art.descripcion, f.nombre, c.nombre, art.tags, art.estado, art.fecha_creado, art.fecha_modificado, u.nombre, g.nombre as "genero" FROM articulos art
                        INNER JOIN fabricantes f ON f.id = art.id_fabricante
                        INNER JOIN categorias c ON c.id = art.id_categoria
                        INNER JOIN usuarios u ON u.id = art.id_usuario
                        INNER JOIN art_genero ag ON ag.id_articulo = art.id
                        INNER JOIN generos g ON g.id  = ag.id_genero
                        where art.id = $1`
    try {
      const { rows} = await db.query(getQuery, [req.params.id]);            
      console.log( rows.map(genero => genero.genero))
      rows[0].genero = rows.map(genero => genero.genero)
      
      return res.status(201).send(rows[0] );
    } catch (error) {
      return res.status(400).send(error);
    }
  },
/**
   * Traer Articulos
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getAll(req, res) {
    const getQuery = `SELECT art.id, art.nombre, art.descripcion, f.nombre, c.nombre, art.tags, art.estado, art.fecha_creado, art.fecha_modificado, u.nombre, g.nombre as "genero" FROM articulos art
                        INNER JOIN fabricantes f ON f.id = art.id_fabricante
                        INNER JOIN categorias c ON c.id = art.id_categoria
                        INNER JOIN usuarios u ON u.id = art.id_usuario
                        INNER JOIN art_genero ag ON ag.id_articulo = art.id
                        INNER JOIN generos g ON g.id  = ag.id_genero
                        where art.estado = 'activo'`
    try {
      const { rows} = await db.query(getQuery);
      
      
      console.log( rows.map(genero => genero.genero))
      rows[0].genero = rows.map(genero => genero.genero)
      
      return res.status(201).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async traerGeneros(id_art) {
    
    return getGeneros
  },

  /**
   * Eliminar
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */

  async eliminar(req, res) {
    const deleteQuery = 'DELETE FROM articulos WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'articulo no encontrado' });
      }
      //VALIDAR QUE NO EXISTA INVENTARIO

      return res.status(204).send({ 'message': 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Editar Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */

  async editar(req, res) {
    const updateQuery = `UPDATE articulos set
                          nombre = $1, 
                          descripcion = $2, 
                          id_fabricante = $3, 
                          id_categoria = $4, 
                          tags = $5, 
                          estado = $6, 
                          fecha_modificado = $7, 
                          id_usuario = $8
                          WHERE id=$9`;
    const values = [
      req.body.nombre,
      req.body.descripcion,
      req.body.id_fabricante,
      req.body.id_categoria,
      req.body.tags || null,
      req.body.estado || "activo",
      new Date().toISOString(),
      req.user.id,
      req.params.id
    ];

    try {

      const rows = await db.query(updateQuery, values);
      console.log(rows.rowCount);

      if (!rows.rowCount) {
        return res.status(404).send({ 'message': 'articulo no encontrado' });
      }

      // Remover Genero
      if (req.body.id_gen_remove) {
        let remGeneros = req.body.id_gen_remove.reduce((txt, genero) => {
          genero = "DELETE FROM art_genero WHERE id_genero =" + genero + " and id_articulo =" + req.params.id + ";";
          return txt + genero
        }, "");
        await db.queryRaw(remGeneros);
      }

      //Agregar Genero      
      if (req.body.id_gen_add) {
        let addGeneros = req.body.id_gen_add.reduce((txt, genero) => {
          genero = "INSERT INTO art_genero(id_articulo, id_genero) values (" + req.params.id + " , " + genero + "); "
          return txt + genero
        }, "");
        await db.queryRaw(addGeneros);
      }

      //VALIDAR QUE NO EXISTA INVENTARIO
      return res.status(200).send({ 'message': 'Actualizado OK' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default ArticuloController;