import { Categoria } from "../sequelize";

const CategoriaController = {
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
    Categoria.create(req.body)
      .then(categoria => {
        console.log(req.user.id)
        res.status(200).json(categoria);
      })
      .catch(error =>
        res.status(400).json({ message: "Error en la creación." })
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
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( categoria => {
      if (categoria[0]==0){
        return res.status(400).json({"message":"Categoria inexistente"})
      }
      return res.status(200).json(categoria[1][0])})
    .catch( error => res.status(400).json(error))
       
  },
  async editar(req, res) {
    
    Categoria.update(
      {nombre: req.body.nombre,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}      
    )
    .then( categoria => {
      if (categoria[0]==0){
        console.log(categoria[0])
        return res.status(400).json({"message":"Categoría inexistente."})
      }
      return res.status(200).json(categoria[1][0])
    })
    .catch( error => res.status(400).json(error))
       
  }
};

export default CategoriaController;
