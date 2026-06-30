import { Request, Response } from "express";
import { getDashboardResumen } from "./dashboard.service";

export async function obtenerResumenDashboard(req: Request, res: Response) {
  try {
    const resumen = await getDashboardResumen();

    res.json({
      message: "Resumen dashboard obtenido correctamente",
      data: resumen,
    });
  } catch (error) {
    console.error("Error obtenerResumenDashboard:", error);

    res.status(500).json({
      message: "Error al obtener resumen dashboard",
      error: error instanceof Error ? error.message : error,
    });
  }
}