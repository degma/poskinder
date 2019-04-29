import jwt from 'jsonwebtoken';
import db from '../db/index';
import {Usuario} from '../sequelize';
import { decode } from 'punycode';

const Auth = {
    /**
     * Verify Token
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     * @returns {object|void} response object 
     */
    async verifyToken(req, res, next) {
        console.log("verificando token!")
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }

        const decoded = await jwt.verify(token, process.env.SECRET);
        Usuario.findOne({where:{ id: decoded.userId}})            
        .then(usuario => {
            if (!usuario) {
                return res.status(400).json({"message":"Token invalido."})
            }
            req.user = { id: decoded.userId };
            console.log ("[ TOKEN VALIDADO ]")
            console.log(req.user)
            next();
        })
        .catch( error => {
            console.log ("------------------ TOKEN ----------------------")
            console.log (error)
        })
        
    }
}

export default Auth;