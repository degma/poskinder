import { Fabricante } from "../sequelize";

const FabricanteController = {
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

    Fabricante.create(req.body)
      .then(fabricante => {
        console.log(req.user.id)
        res.status(200).json(fabricante);
      })
      .catch(error =>{
        console.log(error)
        return res.status(400).json({ message: "Error en la creación." })}
      );
  },
  /**
   * Eliminar Fabricante
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {

    Fabricante.update(
      {
        activo: false,
        usuarioId: req.user.id
      },
      { returning: true, where: { "id": req.params.id } }
    )
      .then(fabricante => {
        if (fabricante[0] == 0) {
          return res.status(400).json({ "message": "Fabricante inexistente" })
        }
        return res.status(200).json(fabricante[1][0])
      })
      .catch(error => res.status(400).json(error))

  },
  async editar(req, res) {

    Fabricante.update(
    
        req.body
        // nombre: req.body.nombre,
        // usuarioId: req.user.id,
        // descripcion: req.body.descripcion,
        // markup: req.body.markup,
        // nombre_contacto: req.body.nombre_contacto,
        // apellido: req.body.apellido,
        // email: req.body.email,
        // celular_contacto: req.body.celular_contacto,
        // telefono: req.body.telefono,
        // website: req.body.website,
        // direccion: req.body.direccion,
        // localidad: req.body.localidad,
        // codigo_postal: req.body.codigo_postal,
        // notas: req.body.notas
      ,
      { returning: true, where: { "id": req.body.id } }
    )
      .then(fabricante => {
        if (fabricante[0] == 0) {
          console.log(fabricante[0])
          return res.status(400).json({ "message": "Fabricante inexistente." })
        }
        return res.status(200).json(fabricante[1][0])
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
    Fabricante.findOne({
      where: { id: req.params.id }
    })
      .then(fabricante => {
        return res.status(200).json(fabricante)
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
    Fabricante.findAll({where: { activo: true }})
      .then(fabricantes => {
        return res.status(200).json(fabricantes)
      })
      .catch(error => { return res.status(400).json(error.name) })

  }
};

export default FabricanteController;
