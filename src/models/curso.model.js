import pool from '../config/db.js';

const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM cursos'
  );
  return rows;
};

const create = async ({ }) => {
  
}

export { findAll };