// ? auth: '/api/users'

const { Router } = require("express");
const { getUsers } = require("../controller/users");

const router = Router();

router.get('/', getUsers);

// router.get('/:id', [
//     check('username', 'Username is required').not().isEmpty(),
//     check('password', 'Password is required').not().isEmpty(),
//     validarCampos,
// ], loginUser);

module.exports = router;