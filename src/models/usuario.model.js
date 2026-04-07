import pool from '../config/db.js';

const findByEmail = async (correo) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE correo_electronico = ?',
    [correo]
  );
  return rows[0];
};

const create = async ({ nombre_usuario, correo_electronico, contrasena, nombre_completo }) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena, nombre_completo)
     VALUES (?, ?, ?, ?)`,
    [nombre_usuario, correo_electronico, contrasena, nombre_completo]
  );
  return result.insertId;
};

const assignRole = async (id_usuario, id_rol) => {
  await pool.query(
    'INSERT INTO rol_usuario (id_rol, id_usuario) VALUES (?, ?)',
    [id_rol, id_usuario]
  );
};

const getRoles = async (id_usuario) => {
  const [rows] = await pool.query(
    `SELECT r.nombre FROM roles r
     INNER JOIN rol_usuario ru ON r.id = ru.id_rol
     WHERE ru.id_usuario = ?`,
    [id_usuario]
  );
  return rows.map(r => r.nombre);
};

export { findByEmail, create, assignRole, getRoles };
