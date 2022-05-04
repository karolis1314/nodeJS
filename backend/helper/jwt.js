const expressJwt = require('express-jwt');


function authJwt(){
    return expressJwt.expressjwt({
        secret: process.env.secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            '/api/v1/users/login',
            '/api/v1/users/register'
        ]
    });
}

module.exports = authJwt;