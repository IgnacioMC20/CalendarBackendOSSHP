require('colors');
require('dotenv').config();

const express = require('express');
const dbConnection = require('./db/config');
const app = express();
const cors = require('cors');

// ? base de datos  
dbConnection();

const port = process.env.PORT || 4000;

// ? cors 
app.use(cors()) 

// ? Directorio Publico
app.use(express.static('public'));

// ? Lectura y parseo del body
app.use(express.json());

// ?  Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Todo: Crud: eventos

// ? Escuchar Peticiones
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.blue);
});