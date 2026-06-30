import { Request, Response } from "express";

import {
  getCatalogosPlanSemanal,
  getPlanesSemanales,
  getPlanSemanalById,
  createPlanSemanal,
  updatePlanSemanal,
  deletePlanSemanal,
  createPlanSemanalAdjunto,
} from "./plan-semanal.service";

export async function obtenerCatalogos(req: Request, res: Response) {
  try {
    const catalogos = await getCatalogosPlanSemanal();
    res.json({ data: catalogos });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener catálogos",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function listarPlanes(req: Request, res: Response) {
  try {
    const planes = await getPlanesSemanales();
    res.json({ total: planes.length, data: planes });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener planes",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function obtenerPlan(req: Request, res: Response) {
  try {
    const plan = await getPlanSemanalById(String(req.params.id));

    if (!plan) {
      return res.status(404).json({ message: "Plan no encontrado" });
    }

    res.json({ data: plan });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener plan",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function crearPlan(req: Request, res: Response) {
  try {
    const plan = await createPlanSemanal(req.body);

    res.status(201).json({
      message: "Plan semanal creado correctamente",
      data: plan,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear plan",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function actualizarPlan(req: Request, res: Response) {
  try {
    const plan = await updatePlanSemanal(String(req.params.id), req.body);

    res.json({
      message: "Plan semanal actualizado correctamente",
      data: plan,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar plan",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function eliminarPlan(req: Request, res: Response) {
  try {
    await deletePlanSemanal(String(req.params.id));

    res.json({
      message: "Plan semanal eliminado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar plan",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function subirAdjuntoPlan(req: Request, res: Response) {
  try {
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({
        message: "No se recibió ningún archivo",
      });
    }

    const adjunto = await createPlanSemanalAdjunto({
      planSemanalId: String(req.params.id),
      url: `/uploads/plan-semanal/${archivo.filename}`,
      nombreArchivo: archivo.originalname,
      tipoArchivo: archivo.mimetype,
    });

    res.status(201).json({
      message: "Adjunto guardado correctamente",
      data: adjunto,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al guardar adjunto",
      error: error instanceof Error ? error.message : error,
    });
  }
}