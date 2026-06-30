import { Router } from "express";

import {
  listarRestricciones,
  obtenerRestriccion,
  crearRestriccion,
  actualizarRestriccion,
  eliminarRestriccion,
} from "./restricciones.controller";

const router = Router();

router.get("/", listarRestricciones);
router.get("/:id", obtenerRestriccion);
router.post("/", crearRestriccion);
router.put("/:id", actualizarRestriccion);
router.delete("/:id", eliminarRestriccion);

export default router;