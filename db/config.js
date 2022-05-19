const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })

        console.log('Base de datos online'.rainbow)

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database'.zebra);
    }

}

module.exports = dbConnection;