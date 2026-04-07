const express = require('express');
const app = express();

// Permite que Express entienda JSON en el body de las peticiones
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'LearnHub API funcionando' });
});

module.exports = app;
