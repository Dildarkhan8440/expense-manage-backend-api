import db from '../../config/db.js';
import responseService from '../services/responseService.js';

export default {
    getUsers: async function(req,res,next){
          db.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            return responseService.Success(res,result,'success')
          });
    }
}