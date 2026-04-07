const express = require('express');
const pool = require('./config/db');

const app = express();

app.use(express.json());

// Prueba de conexión a la BD al arrancar
pool.getConnection()
  .then(connection => {
    console.log('Conexión a MariaDB establecida correctamente');
    connection.release();
  })
  .catch(err => {
    console.error('Error al conectar con MariaDB:', err.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'LearnHub API funcionando' });
});

module.exports = app;
