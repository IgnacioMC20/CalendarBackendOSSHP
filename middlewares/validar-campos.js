const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    
   // ? Validar si hay errores, viene del check() que esta en usuario route
    const msg = validationResult(req);
    if(!msg.isEmpty()){
        return res.status(400).json(msg);
    }
    next();
}

module.exports = {
    validarCampos,
}