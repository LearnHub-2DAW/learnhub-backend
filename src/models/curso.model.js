import pool from '../config/db.js';

const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM cursos'
  );
  return rows;
};

const findById = async ({ id }) => {
  const [result] = await pool.query(
    'SELECT * FROM cursos WHERE id = ?',
    [id]
  );

  return result[0];
}

const create = async ({ nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO cursos (nombre) VALUES (?)',
    [nombre]
  );

  return result.insertId;
}

const update = async ({ id, nombre }) => {
  const [result] = await pool.query(
    `UPDATE cursos
     SET nombre = ?
     WHERE id = ?`,
    [nombre, id]
  );

  return result.affectedRows;
}

const remove = async ({ id }) => {
  const [result] = await pool.query(
    `DELETE FROM cursos
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
}

export { findAll, findById, create, update, remove };