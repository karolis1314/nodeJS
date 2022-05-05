const expressJwt = require('express-jwt');


function authJwt(){
    const api = process.env.API_URL;
    return expressJwt.expressjwt({
        secret: process.env.secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: `${api}/products`, methods: ['GET']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

module.exports = authJwt;