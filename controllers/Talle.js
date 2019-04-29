import { Talle } from "../sequelize";

const TalleController = {
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

    Talle.create(req.body)
      .then(talle => {
        console.log(req.user.id)
        res.status(200).json(talle);
      })
      .catch(error =>
        res.status(400).json({ message: "Error en la creación." })
      );
  },
  /**
   * Eliminar Talle
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {
    
    Talle.update(
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( talle => {
      if (talle[0]==0){
        return res.status(400).json({"message":"Talle inexistente"})
      }
      return res.status(200).json(talle[1][0])})
    .catch( error => res.status(400).json(error))
       
  },
  async editar(req, res) {
    
    Talle.update(
      {nombre: req.body.nombre,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}      
    )
    .then( talle => {
      if (talle[0]==0){
        console.log(talle[0])
        return res.status(400).json({"message":"Categoría inexistente."})
      }
      return res.status(200).json(talle[1][0])
    })
    .catch( error => res.status(400).json(error))
       
  }
};

export default TalleController;
