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
            const { password, lastname, ...rest } = user.toJSON();
            rest.name = rest.name + ' ' + lastname;
            rest.estado = rest.estado ? 'Activo' : 'Inactivo';
            rest.isAdmin = rest.isAdmin ? 'Sí' : 'No';
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

const editStatus = async(req, res) => {
  
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario'
            });
        }else{
            user.estado = !user.estado;
            const { password, lastname, ...rest } = user.toJSON();
            rest.name = rest.name + ' ' + lastname;
            rest.estado = rest.estado ? 'Activo' : 'Inactivo';
            rest.isAdmin = rest.isAdmin ? 'Sí' : 'No';
            
            await user.save();
            return res.json({
                ok: true,
                message: 'Usuario actualizado',
                user: rest
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const editAdmin = async(req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario'
            });
        }else{
            user.isAdmin = !user.isAdmin;
            const { password, lastname, ...rest } = user.toJSON();
            rest.name = rest.name + ' ' + lastname;
            rest.estado = rest.estado ? 'Activo' : 'Inactivo';
            rest.isAdmin = rest.isAdmin ? 'Sí' : 'No';
            
            await user.save();
            return res.json({
                ok: true,
                message: 'Usuario actualizado',
                user: rest
            });
        }
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    getUsers,
    editStatus,
    editAdmin
}