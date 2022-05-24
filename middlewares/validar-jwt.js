const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {
        
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }

    next();
}

const validarJWTAdmin = (req, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {
        
        const { uid, name, isAdmin } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
        if(!isAdmin){
            return res.status(401).json({
                ok: false,
                msg: 'You are not an admin'
            });
        }
        req.isAdmin = isAdmin;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }

    next();
}

module.exports = {
    validarJWT,
    validarJWTAdmin
}