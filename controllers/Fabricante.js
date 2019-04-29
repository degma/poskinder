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
      .catch(error =>
        res.status(400).json({ message: "Error en la creación." })
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
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( fabricante => {
      if (fabricante[0]==0){
        return res.status(400).json({"message":"Fabricante inexistente"})
      }
      return res.status(200).json(fabricante[1][0])})
    .catch( error => res.status(400).json(error))
       
  },
  async editar(req, res) {
    
    Fabricante.update(
      {nombre: req.body.nombre,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}      
    )
    .then( fabricante => {
      if (fabricante[0]==0){
        console.log(fabricante[0])
        return res.status(400).json({"message":"Categoría inexistente."})
      }
      return res.status(200).json(fabricante[1][0])
    })
    .catch( error => res.status(400).json(error))
       
  },
  /**
   * Traer Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getOne(req, res) {
    Fabricante.findOne({
      where:{id: req.params.id}})
    .then( fabricante => {
      return res.status(200).json(fabricante)
    })
    .catch(error => {return res.status(400).json(error.name)})
  },
/**
   * Traer Articulos
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getAll(req, res) {
    Fabricante.findAll()
    .then(fabricantes => {
      return res.status(200).json(fabricantes)
    })
    .catch(error => { return res.status(400).json(error.name)})

  }
};

export default FabricanteController;
