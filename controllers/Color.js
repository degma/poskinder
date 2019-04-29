import { Color } from "../sequelize";

const ColorController = {
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

    Color.create(req.body)
      .then(color => {
        console.log(req.user.id)
        res.status(200).json(color);
      })
      .catch(error =>
        res.status(400).json({ message: "Error en la creación." })
      );
  },
  /**
   * Eliminar Color
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async eliminar(req, res) {
    
    Color.update(
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( color => {
      if (color[0]==0){
        return res.status(400).json({"message":"Color inexistente"})
      }
      return res.status(200).json(color[1][0])})
    .catch( error => res.status(400).json(error))
       
  },
  async editar(req, res) {
    
    Color.update(
      {nombre: req.body.nombre,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}      
    )
    .then( color => {
      if (color[0]==0){
        console.log(color[0])
        return res.status(400).json({"message":"Categoría inexistente."})
      }
      return res.status(200).json(color[1][0])
    })
    .catch( error => res.status(400).json(error))
       
  }
};

export default ColorController;
