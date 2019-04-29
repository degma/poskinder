import { Articulo, Usuario, Categoria, Genero, Fabricante, ArticuloGenero } from '../sequelize'

const ArticuloController = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async crear(req, res) {
    if (!req.body.nombre || !req.body.fabricanteId || !req.body.generoId || !req.body.categoriaId) {
      return res.status(400).send({ 'message': 'Verificar que no falten datos' });
    }

    Articulo.create(req.body)
    .then(articulo => {
      console.log(articulo)            
      articulo.addGeneros(req.body.generoId)
      .then(() => {                   
        return res.status(200).json({"message": "articulo agregado ok [id="+articulo.dataValues.id+"]"})
      })         
      .catch( error =>  {
        console.log(error.original)
        return res.status(400).json({"message": error.name})
      })
    })
    .catch( error =>  {
      console.log(error)
      return res.status(400).json(error.name)
    })

  },
  /**
   * Traer Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async getOne(req, res) {
    Articulo.findOne({
      where:{id: req.params.id},
      include: [{model:Genero},{model:Categoria}, {model:Fabricante}, {model:Usuario}]})
    .then( articulo => {
      return res.status(200).json(articulo)
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
    Articulo.findAll({include: [{model:Genero},{model:Categoria}, {model:Fabricante}, {model:Usuario}]})
    .then(articulos => {
      return res.status(200).json(articulos)
    })
    .catch(error => { return res.status(400).json(error.name)})

  },

  /**
   * Eliminar
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */

  async eliminar(req, res) {
    Articulo.update(
      {activo: false,
      usuarioId: req.user.id},
      {returning: true, where: {"id":req.params.id}}
    )
    .then( articulo => {
      if (Articulo[0]==0){
        return res.status(400).json({"message":"Articulo inexistente"})
      }
      return res.status(200).json(articulo[1][0])})
    .catch( error => res.status(400).json(error))
  },
  /**
   * Editar Articulo
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */

  async editar(req, res) {
    Articulo.update({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      tags: req.body.tags,
      usuarioId: req.user.id,
      fabricanteId: req.body.fabricanteId,
      categoriaId: req.body.categoriaId      
    },{returning: true, where: {"id":req.params.id}})
    .then( () => {
      ArticuloGenero.destroy({
        where: {
          articuloId: req.params.id
        }
      })
      .then(() => {
        console.log("Registros eliminados OK")
        Articulo.findOne({
          where:{
            id: req.params.id}, 
            include: [{model:Genero},{model:Categoria}, {model:Fabricante}]})
          .then( art => {
            console.log(req.body.generoId)            
            art.addGeneros(req.body.generoId)
              .then( () => {                
                Articulo.findByPk(req.params.id,{include:[{model:Genero},{model:Fabricante},{model:Categoria}]}).then(artupdated => {
                  let respuesta = artupdated
                  console.log(artupdated)
                  return res.status(200).json(respuesta)
                })                
              })
              .catch(error => {
                console.log(error)
                return res.status(400).json(error.name)})            
          })
          .catch( error => {return res.status(400).json({"message":error.name})})        
      })
      .catch(error => {
        console.log(error)
        return res.status(400).json(error.name)
      })            
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json(error.name)
    })
  }
}

export default ArticuloController;