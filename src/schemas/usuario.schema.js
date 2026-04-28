import { z } from 'zod';

export const updatePerfilSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(75, 'El nombre no puede superar los 75 caracteres')
    .optional(),

  apellidos: z
    .string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(75, 'Los apellidos no pueden superar los 75 caracteres')
    .optional(),

  ciudad: z
    .string()
    .max(100, 'La ciudad no puede superar los 100 caracteres')
    .optional(),

  pais: z
    .string()
    .max(100, 'El país no puede superar los 100 caracteres')
    .optional(),

  url_imagen_perfil: z
    .string()
    .max(255)
    .optional(),

  notificaciones: z.boolean().optional(),

  canal_tareas: z.boolean().optional(),

  canal_encuestas: z.boolean().optional(),

  formato_hora: z.enum(['12h', '24h']).optional(),

  primer_dia_semana: z
    .enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
    .optional(),

  n_max_eventos: z.number().int().positive().optional(),
});
