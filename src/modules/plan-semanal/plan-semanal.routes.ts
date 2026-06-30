import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  obtenerCatalogos,
  listarPlanes,
  obtenerPlan,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
  subirAdjuntoPlan,
} from "./plan-semanal.controller";

const router = Router();

const uploadDir = path.join(process.cwd(), "uploads", "plan-semanal");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const nombreSeguro = `${Date.now()}-${crypto.randomUUID()}${extension}`;
    callback(null, nombreSeguro);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const permitido =
      file.mimetype.startsWith("image/") || file.mimetype === "application/pdf";

    if (!permitido) {
      return callback(new Error("Solo se permiten imágenes o PDF"));
    }

    callback(null, true);
  },
});

router.get("/catalogos", obtenerCatalogos);
router.get("/", listarPlanes);
router.get("/:id", obtenerPlan);
router.post("/", crearPlan);
router.put("/:id", actualizarPlan);
router.delete("/:id", eliminarPlan);
router.post("/:id/adjuntos", upload.single("archivo"), subirAdjuntoPlan);

export default router;