import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuario.model.js';

const register = async (req, res) => {
  const { nombre_usuario, correo_electronico, contrasena, nombre_completo } = req.body;

  if (!nombre_usuario || !correo_electronico || !contrasena || !nombre_completo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const usuarioExistente = await usuarioModel.findByEmail(correo_electronico);
  if (usuarioExistente) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const id = await usuarioModel.create({
    nombre_usuario,
    correo_electronico,
    contrasena: hashedPassword,
    nombre_completo,
  });

  // Por defecto se registra como alumno (id_rol = 3)
  await usuarioModel.assignRole(id, 3);

  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

const login = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  if (!correo_electronico || !contrasena) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  const usuario = await usuarioModel.findByEmail(correo_electronico);
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
      nombre_completo: usuario.nombre_completo,
      correo_electronico: usuario.correo_electronico,
      roles,
    },
  });
};

export { register, login };
