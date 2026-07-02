"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const plan_semanal_controller_1 = require("./plan-semanal.controller");
const router = (0, express_1.Router)();
const uploadDir = path_1.default.join(process.cwd(), "uploads", "plan-semanal");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, uploadDir);
    },
    filename: (_req, file, callback) => {
        const extension = path_1.default.extname(file.originalname);
        const nombreSeguro = `${Date.now()}-${crypto.randomUUID()}${extension}`;
        callback(null, nombreSeguro);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 8 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        const permitido = file.mimetype.startsWith("image/") || file.mimetype === "application/pdf";
        if (!permitido) {
            return callback(new Error("Solo se permiten imágenes o PDF"));
        }
        callback(null, true);
    },
});
router.get("/catalogos", plan_semanal_controller_1.obtenerCatalogos);
router.get("/", plan_semanal_controller_1.listarPlanes);
router.get("/:id", plan_semanal_controller_1.obtenerPlan);
router.post("/", plan_semanal_controller_1.crearPlan);
router.put("/:id", plan_semanal_controller_1.actualizarPlan);
router.delete("/:id", plan_semanal_controller_1.eliminarPlan);
router.post("/:id/adjuntos", upload.single("archivo"), plan_semanal_controller_1.subirAdjuntoPlan);
exports.default = router;
//# sourceMappingURL=plan-semanal.routes.js.map