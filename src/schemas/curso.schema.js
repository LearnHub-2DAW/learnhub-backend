import { z } from 'zod'

export const cursoSchema = z.object({
    nombre: z
        .string({ error: 'El nombre del curso es obligatorio' })
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no puede superar los 50 caracteres'),
}); 