import { Request, Response } from "express";

import {
  getRestricciones,
  getRestriccionById,
  createRestriccion,
  updateRestriccion,
  deleteRestriccion,
} from "./restricciones.service";

export async function listarRestricciones(req: Request, res: Response) {
  try {
    const restricciones = await getRestricciones();

    res.json({
      total: restricciones.length,
      data: restricciones,
    });
  } catch (error) {
    console.error("Error listarRestricciones:", error);

    res.status(500).json({
      message: "Error al obtener restricciones",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerRestriccion(req: Request, res: Response) {
  try {
    const restriccion = await getRestriccionById(String(req.params.id));

    if (!restriccion) {
      return res.status(404).json({
        message: "Restricción no encontrada",
      });
    }

    res.json(restriccion);
  } catch (error) {
    console.error("Error obtenerRestriccion:", error);

    res.status(500).json({
      message: "Error al obtener restricción",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function crearRestriccion(req: Request, res: Response) {
  try {
    const restriccion = await createRestriccion(req.body);

    res.status(201).json(restriccion);
  } catch (error) {
    console.error("Error crearRestriccion:", error);

    res.status(400).json({
      message: "Error al crear restricción",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function actualizarRestriccion(req: Request, res: Response) {
  try {
    const restriccion = await updateRestriccion(
      String(req.params.id),
      req.body
    );

    res.json(restriccion);
  } catch (error) {
    console.error("Error actualizarRestriccion:", error);

    res.status(400).json({
      message: "Error al actualizar restricción",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function eliminarRestriccion(req: Request, res: Response) {
  try {
    await deleteRestriccion(String(req.params.id));

    res.json({
      message: "Restricción eliminada",
    });
  } catch (error) {
    console.error("Error eliminarRestriccion:", error);

    res.status(400).json({
      message: "Error al eliminar restricción",
      error: error instanceof Error ? error.message : error,
    });
  }
}