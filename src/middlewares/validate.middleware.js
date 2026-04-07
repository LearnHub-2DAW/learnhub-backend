import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const mensajes = error.issues.map(e => e.message);
      return res.status(400).json({ errors: mensajes });
    }
    next(error);
  }
};

export default validate;
