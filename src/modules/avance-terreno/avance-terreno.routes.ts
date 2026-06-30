import { Router } from "express";

import {
  listarAvancesTerreno,
  obtenerAvanceTerreno,
  crearAvanceTerreno,
  actualizarAvanceTerreno,
  eliminarAvanceTerreno,
} from "./avance-terreno.controller";

const router = Router();

router.get("/", listarAvancesTerreno);
router.get("/:id", obtenerAvanceTerreno);
router.post("/", crearAvanceTerreno);
router.put("/:id", actualizarAvanceTerreno);
router.delete("/:id", eliminarAvanceTerreno);

export default router;