import { Router } from "express";
import { obtenerResumenDashboard } from "./dashboard.controller";

const router = Router();

router.get("/resumen", obtenerResumenDashboard);

export default router;