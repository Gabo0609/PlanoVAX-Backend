"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const proyectos_routes_1 = __importDefault(require("./modules/proyectos/proyectos.routes"));
const actividades_routes_1 = __importDefault(require("./modules/actividades/actividades.routes"));
const plan_semanal_routes_1 = __importDefault(require("./modules/plan-semanal/plan-semanal.routes"));
const restricciones_routes_1 = __importDefault(require("./modules/restricciones/restricciones.routes"));
const avance_terreno_routes_1 = __importDefault(require("./modules/avance-terreno/avance-terreno.routes"));
const lookahead_routes_1 = __importDefault(require("./modules/lookahead/lookahead.routes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4173",
    "http://localhost:5173",
    "http://172.16.43.59:4173",
    "https://plano-vax-frontend.vercel.app",
    "https://plano-vax-frontend-9va3tu44e-planovax.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);
const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.options(/.*/, (0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use((req, _res, next) => {
    console.log("REQ:", req.method, req.url);
    next();
});
app.get("/", (_req, res) => {
    res.status(200).json({
        status: "online",
        application: "PlanoVAX Backend",
        version: "1.0.0",
    });
});
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        application: "PlanoVAX Backend",
        version: "1.0.0",
    });
});
app.use("/auth", auth_routes_1.default);
app.use("/proyectos", proyectos_routes_1.default);
app.use("/actividades", actividades_routes_1.default);
app.use("/plan-semanal", plan_semanal_routes_1.default);
app.use("/restricciones", restricciones_routes_1.default);
app.use("/avance-terreno", avance_terreno_routes_1.default);
app.use("/dashboard", dashboard_routes_1.default);
app.use("/lookahead", lookahead_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map