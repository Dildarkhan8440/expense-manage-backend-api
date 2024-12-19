
 class ResponseService {

    loginSuccess(res,data,token,refresh_token,msg) {
       return res.status(200).send({
           'data': data,
           'message':msg,
           'token' : token,
           'refresh_token' : refresh_token
       })
   }

   Success(res,data,msg) {
       return res.status(200).send({
           'data': data,
           'message':msg,
       })
   }

   error(res,errors,msg) {
        return res.status(400).send({
           'errors': errors,
           'message':msg
       })
   }
}

export default new ResponseService;


