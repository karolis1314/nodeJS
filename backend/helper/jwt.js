const expressJwt = require('express-jwt');


function authJwt(){
    const api = process.env.API_URL;
    return expressJwt.expressjwt({
        secret: process.env.secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ['GET']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

async function isRevoked(req, payload){
    if(payload.payload.isAdmin){
        return false;
    }else{
        return true;
    }
}

module.exports = authJwt;