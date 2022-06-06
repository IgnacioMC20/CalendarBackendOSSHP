
const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, isAdmin) => {
  return new Promise((resolve, reject) => {

    const payload = { uid, name, isAdmin };

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '4h'
    }, (err, token) => {
        if (err) {
            console.log(err);
            reject('Could not generate token');
        }
        
        resolve(token);
    });

   
  });
}

module.exports = generateJWT;