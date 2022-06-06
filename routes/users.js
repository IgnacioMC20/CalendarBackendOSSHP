// ? auth: '/api/users'

const { Router } = require("express");
const { getUsers, editStatus, editAdmin, getUser, editUserInfo } = require("../controller/users");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarJWTAdmin } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.put('/:id', [
    validarJWTAdmin,
    validarCampos
], editUserInfo);

router.put('/status/:id', [
    validarJWTAdmin,
    validarCampos
], editStatus);

router.put('/admin/:id', [
    validarJWTAdmin,
    validarCampos
], editAdmin);



// router.get('/:id', [
//     check('username', 'Username is required').not().isEmpty(),
//     check('password', 'Password is required').not().isEmpty(),
//     validarCampos,
// ], loginUser);

module.exports = router;