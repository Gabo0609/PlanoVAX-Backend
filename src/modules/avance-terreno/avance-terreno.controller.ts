import { Request, Response } from "express";

import {
  getAvancesTerreno,
  getAvanceTerrenoById,
  createAvanceTerreno,
  updateAvanceTerreno,
  deleteAvanceTerreno,
} from "./avance-terreno.service";

export async function listarAvancesTerreno(req: Request, res: Response) {
  try {
    const avances = await getAvancesTerreno();

    res.json({
      total: avances.length,
      data: avances,
    });
  } catch (error) {
    console.error("Error listarAvancesTerreno:", error);

    res.status(500).json({
      message: "Error al obtener avances de terreno",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerAvanceTerreno(req: Request, res: Response) {
  try {
    const avance = await getAvanceTerrenoById(String(req.params.id));

    if (!avance) {
      return res.status(404).json({
        message: "Avance de terreno no encontrado",
      });
    }

    res.json({
      data: avance,
    });
  } catch (error) {
    console.error("Error obtenerAvanceTerreno:", error);

    res.status(500).json({
      message: "Error al obtener avance de terreno",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function crearAvanceTerreno(req: Request, res: Response) {
  try {
    const avance = await createAvanceTerreno(req.body);

    res.status(201).json({
      message: "Avance de terreno guardado correctamente",
      data: avance,
    });
  } catch (error) {
    console.error("Error crearAvanceTerreno:", error);

    res.status(400).json({
      message: "Error al guardar avance de terreno",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function actualizarAvanceTerreno(req: Request, res: Response) {
  try {
    const avance = await updateAvanceTerreno(String(req.params.id), req.body);

    res.json({
      message: "Avance de terreno actualizado correctamente",
      data: avance,
    });
  } catch (error) {
    console.error("Error actualizarAvanceTerreno:", error);

    res.status(400).json({
      message: "Error al actualizar avance de terreno",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function eliminarAvanceTerreno(req: Request, res: Response) {
  try {
    await deleteAvanceTerreno(String(req.params.id));

    res.json({
      message: "Avance de terreno eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminarAvanceTerreno:", error);

    res.status(400).json({
      message: "Error al eliminar avance de terreno",
      error: error instanceof Error ? error.message : error,
    });
  }
}