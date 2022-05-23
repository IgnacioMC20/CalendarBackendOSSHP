/**
 * '/api/events'
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvents, updateEvent, deleteEvent } = require("../controller/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

// ? todas las rutas por debajo de esta ruta van a pasar por la validacion del jsonwebtoken
router.use(validarJWT);

// ? Obtener eventos
router.get('/', [
    validarCampos    
], getEvents);

// ? Crear un nuevo evento
router.post('/', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is not valid').custom(isDate),
    check('end', 'End date is not valid').custom(isDate),
    validarCampos
], createEvents);

// ? Actualizar un nuevo evento
router.put('/:id', [
    check('title', 'title is required').not().isEmpty(),
    check('notes', 'notes are required').not().isEmpty(),
    check('start', 'Start date is not valid').custom(isDate),
    check('end', 'End date is not valid').custom(isDate),
    validarCampos
], updateEvent);

// ? Eliminar un nuevo evento
router.delete('/:id', [
    check(),
    validarCampos
], deleteEvent);

module.exports =  router;