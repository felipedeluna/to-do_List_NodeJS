const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next){
    const auth = req.headers['authorization'];  
    const token = auth && auth.split(' ')[1];

    if(!token){
        return res.status(401).send({ error: 'Token não fornecido' });
    }

    jwt.verify(token, 'secretKey', (err, usuario) => {
        if(err){
            return res.status(401).send({ error: 'Token inválido' });
        }
    
        req.usuario = usuario;
        next();
    })
}

module.exports = {autenticarToken};