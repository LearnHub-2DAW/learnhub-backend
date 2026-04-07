import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuario.model.js';

const register = async (req, res) => {
  const { nombre_usuario, correo_electronico, contrasena, nombre, apellidos, ciudad, pais } = req.body;

  const usuarioExistente = await usuarioModel.findByUsername(nombre_usuario);
  if (usuarioExistente) {
    return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
  }

  const correoExistente = await usuarioModel.findByEmail(correo_electronico);
  if (correoExistente) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const id = await usuarioModel.create({
    nombre_usuario,
    correo_electronico,
    contrasena: hashedPassword,
    nombre,
    apellidos,
    ciudad,
    pais,
  });

  // Por defecto se registra como alumno (id_rol = 3)
  await usuarioModel.assignRole(id, 3);

  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

const login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  const usuario = await usuarioModel.findByUsername(nombre_usuario);
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passwordValida) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const roles = await usuarioModel.getRoles(usuario.id);

  const token = jwt.sign(
    { id: usuario.id, roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    token,
    usuario: {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo_electronico: usuario.correo_electronico,
      roles,
    },
  });
};

export { register, login };
