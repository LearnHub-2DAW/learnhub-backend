import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());

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

app.use('/api/auth', authRoutes);

app.use('/api/cursos', cursoRoutes);

export default app;
