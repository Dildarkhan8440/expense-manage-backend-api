import jwt from 'jsonwebtoken';
export default {
    authentication : function(req, res, next){
        try {
            if(req.headers.authorization){
                var token = req.headers.authorization.split(" ")[1];           
            }else{
                var token = req.body.token;
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.token_data = decoded;
            req.token_data.token = token
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed',
                error : error
            });
        }
    }
}

