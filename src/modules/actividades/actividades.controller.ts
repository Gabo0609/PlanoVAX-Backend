import { Request, Response } from "express";

import {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
} from "./actividades.service";

export async function listarActividades(req: Request, res: Response) {
  try {
    const actividades = await getActividades();

    res.json({
      total: actividades.length,
      data: actividades,
    });
  } catch (error) {
    console.error("Error listarActividades:", error);

    res.status(500).json({
      message: "Error al obtener actividades",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerActividad(req: Request, res: Response) {
  try {
    const actividad = await getActividadById(String(req.params.id));

    if (!actividad) {
      return res.status(404).json({
        message: "Actividad no encontrada",
      });
    }

    res.json({
      data: actividad,
    });
  } catch (error) {
    console.error("Error obtenerActividad:", error);

    res.status(500).json({
      message: "Error al obtener actividad",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function crearActividad(req: Request, res: Response) {
  try {
    const actividad = await createActividad(req.body);

    res.status(201).json({
      message: "Actividad creada correctamente",
      data: actividad,
    });
  } catch (error) {
    console.error("Error crearActividad:", error);

    res.status(400).json({
      message: "Error al crear actividad",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function actualizarActividad(req: Request, res: Response) {
  try {
    const actividad = await updateActividad(String(req.params.id), req.body);

    res.json({
      message: "Actividad actualizada correctamente",
      data: actividad,
    });
  } catch (error) {
    console.error("Error actualizarActividad:", error);

    res.status(400).json({
      message: "Error al actualizar actividad",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function eliminarActividad(req: Request, res: Response) {
  try {
    await deleteActividad(String(req.params.id));

    res.json({
      message: "Actividad desactivada correctamente",
    });
  } catch (error) {
    console.error("Error eliminarActividad:", error);

    res.status(400).json({
      message: "Error al eliminar actividad",
      error: error instanceof Error ? error.message : error,
    });
  }
}