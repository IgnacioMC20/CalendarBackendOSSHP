const User = require('../models/User');

const getUsers = async(req, res) => {
  
    try {
        const users = await User.find();

        if(!users) {
            return res.status(404).json({
                ok: false,
                message: 'No hay usuarios registrados'
            });
        }
        
        const usersList = users.map( user => {
            const { password, id, lastname, ...rest } = user.toJSON();
            rest.name = rest.name + ' ' + lastname;
            rest.estado = rest.estado ? 'Activo' : 'Inactivo';
            rest.isAdmin = rest.isAdmin ? 'Si' : 'No';
            return rest;
        }); 

        return res.json({
            ok: true,
            users: usersList
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error"
        });
    }    
}

module.exports = {
    getUsers
}