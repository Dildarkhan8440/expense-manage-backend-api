import Joi from "joi";
import ResponseService from "../services/responseService.js";
import jwt from 'jsonwebtoken';
import db from '../../config/db.js'


export default {
    login: function(req,res,next){
      
      const { error, value } = Joi.object({
        email: Joi.string().email().required().messages({
          'string.email': 'Email must be a valid email address.',
          'any.required': 'Email is required.',
        }),
        password: Joi.string().messages({
            'any.required':'Password is required',
        }),
      }).validate(req.body);
     
      if (error) {
        // If validation fails, send a 400 response with the error details
        return ResponseService.error(res,error,'validation error');
      }
      
    db.query(`Select * from users where email='${req.body.email}' AND password='${req.body.password}'`, function (err, result, fields) {
      if (result[0]) {
        
        const user= {id:result[0]['id'],name:result[0]['name'],email:result[0]['email'],role:result[0]['role']}
          const token = jwt.sign(
            user,
            process.env.SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION
            }
          );
          const refresh_token = jwt.sign(
            user,
            process.env.JWT_REFRESH_KEY
          );
          var data={
            token:token,
            refresh_token:refresh_token,
            data:user
          }
          return ResponseService.Success(res,data,'success');
      }
      return ResponseService.error(res,err,'email and password not match')
      
    });
    },
    register: async function(req,res,next){
      const { error, value } = Joi.object({
        name: Joi.string().required().messages({
          'any.required': 'Name is required.',
        }),
        email: Joi.string().email().required().messages({
          // 'string.email': 'Email must be a valid email address.',
          'any.required': 'Email is required.',
        }),
        password: Joi.string().messages({
            'any.required':'Password is required',
        }),
        // confirm:Joi.string().valid(Joi.ref('password')).required().messages({
        //   'any.only': 'Passwords must match'
        // })
      }).validate(req.body);
      if (error) {
        return ResponseService.error(res,error,'validation error');
      }
      // var password  = bcrypt.hashSync(req.body.password, 10);
      db.query(`INSERT INTO users(name,email,password,role) VALUES('${req.body.name}','${req.body.email}','${req.body.password}','user')`, function (err, result, fields) {
        if (err) throw err;
        return ResponseService.Success(res,result,'success');
      });
       
    }
}