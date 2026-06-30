import { Router } from "express";
import {
  actualizarLookahead,
  crearLookahead,
  eliminarLookahead,
  listarLookahead,
  obtenerCatalogosLookahead,
  obtenerLookahead,
  obtenerResumenLookahead,
} from "./lookahead.controller";

const router = Router();

router.get("/catalogos", obtenerCatalogosLookahead);
router.get("/resumen", obtenerResumenLookahead);
router.get("/", listarLookahead);
router.get("/:id", obtenerLookahead);
router.post("/", crearLookahead);
router.put("/:id", actualizarLookahead);
router.delete("/:id", eliminarLookahead);

export default router;