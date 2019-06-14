import moment from "moment";
import db from "../db/";
import Helper from "./Helper";
import { Usuario } from "../sequelize";

const UsuarioController = {
  /**
   * Crear un Usuario
   * @param {object} req
   * @param {object} res
   * @returns {object} usuario
   */
  async crear(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "registro incompleto, ingrese todos los valores." });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Ingresar un email valido" });
    }

    const hashPassword = Helper.hashPassword(req.body.password);
    req.body.password = hashPassword;

    Usuario.create(req.body)
      .then(usuario => res.json({"message":"Usuario creado correctamente!"}))
      .catch(err => {
        if (err.routine === "_bt_check_unique") {
          res
            .status(400)
            .json({ message: "User with that EMAIL already exist" });
        }
        return res.status(400).send(error);
      });
  },
  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Some values are missing" });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }

    Usuario.findOne({ where: {email: req.body.email}})
    .then(usuario =>{      
      if(!usuario) {
        console.log("entro porque !usuario")
        return res
        .status(400)
        .json({"message":"Credenciales incorrectas!"})
      }
      if(!Helper.comparePassword(usuario.password, req.body.password)) {
        return res
        .status(400)
        .json({"message":"Credenciales incorrectas!"})
      }
      const token = Helper.generateToken(usuario.id);
      console.log("[" + usuario.email + "] login correcto");
      return res.status(200).send({ token: token, userId: usuario.id });
    })
    .catch( error => {
      console.log(error)
      return res.status(400).json(error)})
    
    
  },
  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = "DELETE FROM usuarios WHERE id=$1 returning *";
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "user not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default UsuarioController;
