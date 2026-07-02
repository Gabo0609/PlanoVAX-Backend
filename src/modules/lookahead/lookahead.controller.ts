import { Request, Response } from "express";
import {
  createLookahead,
  deleteLookahead,
  getCatalogosLookahead,
  getLookaheadById,
  getLookaheads,
  getResumenLookahead,
  updateLookahead,
} from "./lookahead.service";

function getParamId(req: Request): string {
  return String(req.params.id);
}

export async function obtenerCatalogosLookahead(req: Request, res: Response) {
  try {
    const data = await getCatalogosLookahead();

    res.json({
      message: "Catálogos lookahead obtenidos correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener catálogos lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function listarLookahead(req: Request, res: Response) {
  try {
    const data = await getLookaheads();

    res.json({
      message: "Lookahead obtenido correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerLookahead(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const data = await getLookaheadById(id);

    if (!data) {
      return res.status(404).json({
        message: "Registro lookahead no encontrado",
      });
    }

    res.json({
      message: "Registro lookahead obtenido correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener registro lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function crearLookahead(req: Request, res: Response) {
  try {
    const data = await createLookahead(req.body);

    res.status(201).json({
      message: "Registro lookahead creado correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear registro lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function actualizarLookahead(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const data = await updateLookahead(id, req.body);

    res.json({
      message: "Registro lookahead actualizado correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar registro lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function eliminarLookahead(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    await deleteLookahead(id);

    res.json({
      message: "Registro lookahead eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar registro lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerResumenLookahead(req: Request, res: Response) {
  try {
    const data = await getResumenLookahead();

    res.json({
      message: "Resumen lookahead obtenido correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener resumen lookahead",
      error: error instanceof Error ? error.message : error,
    });
  }
}