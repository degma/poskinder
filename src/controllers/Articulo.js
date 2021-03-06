import {
  Articulo,
  Usuario,
  Categoria,
  Genero,
  Fabricante,
  ArticuloGenero,
  ListaPrecio,
  Precio
} from "../sequelize";

const ArticuloController = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async crear(req, res) {

    if (!req.body.nombre || !req.body.precio || !req.body.listaprecioId) {
      return res.status(400).send({ message: "Verificar que no falten datos" });
    }

    Articulo.create(req.body)
      .then(articulo => {
        articulo
          .addGenero(req.body.generoId)
          .then(genero => {
            console.log("Genero agregado", genero);
            articulo
              .addListaprecio(req.body.listaprecioId, {
                through: { precio: req.body.precio }
              })
              .then(listap => {
                console.log("Listaprecio agregado", listap);
                Articulo.findByPk(articulo.id, {
                  include: [{ all: true }]
                }).then(art => {
                  return res.status(200).json(art);
                });
              })
              .catch(error => {
                console.log(error);
                return res.status(400).json({ message: error.name });
              });
          })
          .catch(error => {
            console.log(error);
            return res.status(400).json({ message: error.name });
          });
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json(error.name);
      });
  },
  /**
   * Traer Articulo
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  async getOne(req, res) {
    Articulo.findOne({
      where: { id: req.params.id },
      include: [
        { model: Genero },
        { model: Categoria },
        { model: Fabricante },
        { model: Usuario }
      ]
    })
      .then(articulo => {
        return res.status(200).json(articulo);
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
    ListaPrecio.findOne({
      where: { activo: true },
      include: [
        {
          model: Articulo,
          where: { activo: true },
          include: [{ all: true }]
        }
      ]
    })
      .then(articulos => {
        return res.status(200).json(articulos);
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json(error.name);
      });
  },

  /**
   * Eliminar
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {
    Articulo.update(
      {
        activo: false,
        usuarioId: req.user.id
      },
      { returning: true, where: { id: req.params.id } }
    )
      .then(articulo => {
        if (Articulo[0] == 0) {
          return res.status(400).json({ message: "Articulo inexistente" });
        }
        return res.status(200).json(articulo[1][0]);
      })
      .catch(error => res.status(400).json(error));
  },
  /**
   * Editar Articulo
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async editar(req, res) {
    Articulo.update(
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tags: req.body.tags,
        usuarioId: req.user.id,
        fabricanteId: req.body.fabricanteId,
        categoriaId: req.body.categoriaId
      },
      { returning: true, where: { id: req.body.id } }
    )
      .then(() => {
        ArticuloGenero.destroy({
          where: {
            articuloId: req.body.id
          }
        })
          .then(() => {
            console.log("Registros actualizado OK");
            Articulo.findOne({
              where: {
                id: req.body.id
              },
              include: [{ all: true }]
            })
              .then(art => {
                console.log(req.body.generoId);
                art
                  .addGeneros(req.body.generoId)
                  .then(() => {                    
                    Precio.update(
                      {
                        precio: req.body.precio
                      },
                      {
                        returning: false,
                        where: {
                          articuloId: req.body.id,
                          listaprecioId: req.body.listaprecioId
                        }
                      }
                    ).then(() => {
                      Articulo.findByPk(req.body.id, {
                        include: [{ all: true }]
                      })
                        .then(artupdated => {
                          let respuesta = artupdated;
                          console.log(artupdated);
                          return res.status(200).json(respuesta);
                        })
                        .catch(error => res.status(400).json(error.name));
                    });
                  })
                  .catch(error => {
                    console.log(error);
                    return res.status(400).json(error.name);
                  });
              })
              .catch(error => {
                return res.status(400).json({ message: error.name });
              });
          })
          .catch(error => {
            console.log(error);
            return res.status(400).json(error.name);
          });
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json(error.name);
      });
  }
};

export default ArticuloController;
