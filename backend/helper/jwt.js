const expressJwt = require('express-jwt');


function authJwt(){
    const api = process.env.API_URL;
    return expressJwt.expressjwt({
        secret: process.env.secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ['GET']},
            `${api}/users/login`,
            `${api}/users/register`,
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET']}
        ]
    });
}

module.exports = authJwt;