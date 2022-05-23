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
        
        return res.json({
            ok: true,
            users
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