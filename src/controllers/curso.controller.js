import * as cursoModel from '../models/curso.model.js';

const findAll = async (req, res) => {
  const cursos = await cursoModel.findAll();

  res.status(200).json(cursos);
}

export { findAll }