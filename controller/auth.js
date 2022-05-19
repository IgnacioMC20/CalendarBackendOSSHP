const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const generateJWT = require("../helpers/jwt");
const User = require('../models/User');

const createUser = async (req, res = response) => {

    const { username, password } = req.body;


    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User(req.body);

        // ? Hash password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // ? Generate token
        const token = await generateJWT(user.id, user.name);
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });

    }


}

const loginUser = async(req, res = response) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User doesn\'t exists'
            });
        }

        // ? check password

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        // ? Generate token
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error login user'
        });
        
    }
}

const renewToken = async(req, res = response) => {

    const { uid, name } = req;

    const user = await User.findById(uid);
    // console.log(user);
    if(user){
        const isAdmin = user.isAdmin;
        const token = await generateJWT(uid, name);
    
       return res.json({
            ok: true,
            token,
            uid,
            name,
            isAdmin
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}