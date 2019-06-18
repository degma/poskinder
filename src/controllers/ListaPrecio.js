import { ListaPrecio } from "../sequelize";

const ListaPrecioController = {
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

    ListaPrecio.create(req.body)
      .then(listaprecio => {
        console.log(req.user.id)
        res.status(200).json(listaprecio);
      })
      .catch(error =>
        res.status(400).json({ message: error }) 
      );
  },
  /**
   * Eliminar ListaPrecio
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {
    
    ListaPrecio.update(
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( listaprecio => {
      if (listaprecio[0]==0){
        return res.status(400).json({"message":"Lista de Precio inexistente"})
      }
      return res.status(200).json(listaprecio[1][0])})
    .catch( error => res.status(400).json(error))
       
  },
  async editar(req, res) {
    
    ListaPrecio.update(
      {nombre: req.body.nombre,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}      
    )
    .then( listaprecio => {
      if (listaprecio[0]==0){
        console.log(listaprecio[0])
        return res.status(400).json({"message":"Categoría inexistente."})
      }
      return res.status(200).json(listaprecio[1][0])
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
    ListaPrecio.findOne({
      where:{id: req.params.id}})
    .then( listaprecio => {
      return res.status(200).json(listaprecio)
    })
    .catch(error => {return res.status(400).json(error.name)})
  },
  /**
   * Traer actual
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getCurrent(req, res) {
    ListaPrecio.findOne({
      where:{activo: true}})
    .then( listaprecio => {
      return res.status(200).json(listaprecio)
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
    ListaPrecio.findAll()
    .then(listaprecio => {
      return res.status(200).json(listaprecio)
    })
    .catch(error => { return res.status(400).json(error.name)})

  }
};

export default ListaPrecioController;
