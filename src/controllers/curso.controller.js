import * as cursoModel from '../models/curso.model.js';

const findAll = async (req, res) => {
  const cursos = await cursoModel.findAll();

  res.status(200).json(cursos);
}

const findById = async (req, res) => {
  const { id } = req.params;
  const curso = await cursoModel.findById({ id });

  if (!curso) {
    res.status(404).json({ message: `No se ha encontrado ningún curso con el id: ${id}` });
    return;
  }

  res.status(200).json(curso);
}

const create = async (req, res) => {
  const { nombre } = req.body;

  const nuevoCurso = await cursoModel.create({ nombre });

  if (!nuevoCurso) {
    res.status(500).json({ message: 'Error al crear el curso' });
    return;
  }

  const curso = await cursoModel.findById({ id: nuevoCurso });

  res.status(201).json(curso);
}

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const nuevoCurso = await cursoModel.update({ id, nombre });

  if (nuevoCurso === 0) {
    res.status(404).json({ message: `No se ha encontrado un curso con ese id` });
    return;
  }

  const curso = await cursoModel.findById({ id });

  res.status(200).json(curso);
}

const remove = async (req, res) => {
  const { id } = req.params;

  const cursoBorrado = await cursoModel.remove({ id });

  if (cursoBorrado === 0) {
    res.status(404).json({ message: `No se ha encontrado un curso con ese id` });
    return;
  }

  res.status(200).json({ message: 'Curso eliminado correctamente'} );
}

export { findAll, findById, create, update, remove };