const User = require('../models/User');
const bcrypt = require("bcryptjs/dist/bcrypt");


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

const getUser = async(req, res) => {
    const { id } = req.params;

    try {
        const users = await User.findById(id);

        if(!users) {
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario'
            });
        }

        const { password, isAdmin, estado, ...rest } = users.toJSON();

        return res.json({
            ok: true,
            user: rest
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
                msg: 'No existe el usuario'
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
                msg: 'Usuario actualizado',
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
                msg: 'No existe el usuario'
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
                msg: 'Usuario actualizado',
                user: rest
            });
        }
    } catch (error) {
        console.log(error);        
    }
}

const editUserInfo = async(req, res) => {

    const { id } = req.params;


  try {
      let { password, username, ...data } = req.body;

      let usernameExists = await User.findOne({ username: username });

      if(usernameExists && usernameExists.id != id){
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario ya existe'
            });
        }
        data.username = username;

      if(password && password.length > 4){
          // ? Hash password
          const salt = bcrypt.genSaltSync(10);
          data.password = bcrypt.hashSync(password, salt);
        }
        let user = await User.findOneAndUpdate({ id }, data, { new: true });
        // let user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        res.json({
            ok: true,
            user: user,
        });


  } catch (error) {
      console.log(error);
  }
}

module.exports = {
    getUsers,
    getUser,
    editStatus,
    editAdmin,
    editUserInfo
}