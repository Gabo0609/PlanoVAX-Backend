import { Request, Response } from "express";
import {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from "./proyectos.service";

export async function listarProyectos(req: Request, res: Response) {
  try {
    const proyectos = await getAllProyectos();

    res.json({
      total: proyectos.length,
      data: proyectos,
    });
  } catch {
    res.status(500).json({
      message: "Error al obtener proyectos",
    });
  }
}

export async function obtenerProyecto(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    const proyecto = await getProyectoById(id);

    if (!proyecto) {
      return res.status(404).json({
        message: "Proyecto no encontrado",
      });
    }

    res.json({
      data: proyecto,
    });
  } catch {
    res.status(500).json({
      message: "Error al obtener proyecto",
    });
  }
}

export async function crearProyecto(req: Request, res: Response) {
  try {
    const proyecto = await createProyecto(req.body);

    res.status(201).json({
      message: "Proyecto creado correctamente",
      data: proyecto,
    });
  } catch {
    res.status(400).json({
      message: "Error al crear proyecto",
    });
  }
}

export async function actualizarProyecto(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    const proyecto = await updateProyecto(id, req.body);

    res.json({
      message: "Proyecto actualizado",
      data: proyecto,
    });
  } catch {
    res.status(400).json({
      message: "Error al actualizar proyecto",
    });
  }
}

export async function eliminarProyecto(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    await deleteProyecto(id);

    res.json({
      message: "Proyecto eliminado",
    });
  } catch {
    res.status(400).json({
      message: "Error al eliminar proyecto",
    });
  }
}