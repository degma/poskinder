import { Categoria } from "../sequelize";

const CategoriaController = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async crear(req, res) {
    console.log("llego este formulario",req.body)
    if (!req.body.nombre) {
      return res
        .status(400)
        .send({ message: "El campo NOMBRE es obligatorio." });
    }
    req.body.usuarioId = req.user.id;
    Categoria.create(req.body)
      .then(categoria => {      
        return res.status(200).json(categoria);
      })
      .catch(error =>
        res.status(400).json({ message: error })
      );
  },
  /**
   * Eliminar Categoria
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {
    Categoria.update(
      { activo: false, usuarioId: req.user.id },
      { returning: true, where: { id: req.params.id } }
    )
      .then(categoria => {
        if (categoria[0] == 0) {
          return res.status(400).json({ message: "Categoria inexistente" });
        }
        return res.status(200).json(categoria[1][0]);
      })
      .catch(error => res.status(400).json(error));
  },
  async editar(req, res) {
    Categoria.update(
      req.body ,
      { returning: true, where: { id: req.params.id } }
    )
      .then(categoria => {
        if (categoria[0] == 0) {
          console.log(categoria[0]);
          return res.status(400).json({ message: "Categoría inexistente." });
        }
        return res.status(200).json(categoria[1][0]);
      })
      .catch(error => res.status(400).json(error));
  },
  /**
   * Traer Articulo
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  async getOne(req, res) {
    Categoria.findOne({
      where: { id: req.params.id }
    })
      .then(categoria => {
        return res.status(200).json(categoria);
      })
      .catch(error => {
        return res.status(400).json(error.name);
      });
  },
  /**
   * Traer Articulos
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  async getAll(req, res) {
    Categoria.findAll({      
      where: { activo: true }
    })
      .then(categorias => {
        return res.status(200).json(categorias);
      })
      .catch(error => {
        return res.status(400).json(error.name);
      });
  }
};

export default CategoriaController;
