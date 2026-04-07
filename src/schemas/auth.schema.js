import { z } from 'zod';

export const registerSchema = z.object({
  nombre_usuario: z
    .string({ error: 'El nombre de usuario es obligatorio' })
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(100, 'El nombre de usuario no puede superar los 100 caracteres'),

  correo_electronico: z
    .string({ error: 'El correo electrónico es obligatorio' })
    .email('El correo electrónico no tiene un formato válido')
    .max(100, 'El correo electrónico no puede superar los 100 caracteres'),

  contrasena: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),

  nombre_completo: z
    .string({ error: 'El nombre completo es obligatorio' })
    .min(2, 'El nombre completo debe tener al menos 2 caracteres')
    .max(150, 'El nombre completo no puede superar los 150 caracteres'),
});

export const loginSchema = z.object({
  correo_electronico: z
    .string({ error: 'El correo electrónico es obligatorio' })
    .email('El correo electrónico no tiene un formato válido'),

  contrasena: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(1, 'La contraseña es obligatoria'),
});
