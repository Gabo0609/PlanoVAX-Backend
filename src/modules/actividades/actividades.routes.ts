import { Router } from "express";

import {
  listarActividades,
  obtenerActividad,
  crearActividad,
  actualizarActividad,
  eliminarActividad,
} from "./actividades.controller";

const router = Router();

router.get("/", listarActividades);
router.get("/:id", obtenerActividad);
router.post("/", crearActividad);
router.put("/:id", actualizarActividad);
router.delete("/:id", eliminarActividad);

export default router;