import { Genero } from "../sequelize";

const GeneroController = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async crear(req, res) {
    if (!req.body.nombre) {
      return res
        .status(400)
        .send({ message: "El campo NOMBRE es obligatorio." });
    }
    req.body.usuarioId = req.user.id

    Genero.create(req.body)
      .then(genero => {
        console.log(req.user.id)
        res.status(200).json(genero);
      })
      .catch(error =>
        res.status(400).json({ message: "Error en la creación." })
      );
  },
  /**
   * Eliminar Genero
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {

    Genero.update(
      {
        activo: false,
        usuarioId: req.user.id
      },
      { returning: true, where: { "id": req.params.id } }
    )
      .then(genero => {
        if (genero[0] == 0) {
          return res.status(400).json({ "message": "Genero inexistente" })
        }
        return res.status(200).json(genero[1][0])
      })
      .catch(error => res.status(400).json(error))

  },
  async editar(req, res) {

    Genero.update(
      {
        nombre: req.body.nombre,
        usuarioId: req.user.id
      },
      { returning: true, where: { "id": req.params.id } }
    )
      .then(genero => {
        if (genero[0] == 0) {
          console.log(genero[0])
          return res.status(400).json({ "message": "Categoría inexistente." })
        }
        return res.status(200).json(genero[1][0])
      })
      .catch(error => res.status(400).json(error))

  },
  /**
   * Traer Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getOne(req, res) {
    Genero.findOne({
      where: { id: req.params.id }
    })
      .then(genero => {
        return res.status(200).json(genero)
      })
      .catch(error => { return res.status(400).json(error.name) })
  },
  /**
     * Traer Articulos
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object 
     */

  async getAll(req, res) {
    Genero.findAll({where:{ activo: true}})
      .then(generos => {
        return res.status(200).json(generos)
      })
      .catch(error => { return res.status(400).json(error.name) })

  }
};

export default GeneroController;
