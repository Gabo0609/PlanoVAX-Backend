import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import authRoutes from "./modules/auth/auth.routes";
import proyectosRoutes from "./modules/proyectos/proyectos.routes";
import actividadesRoutes from "./modules/actividades/actividades.routes";
import planSemanalRoutes from "./modules/plan-semanal/plan-semanal.routes";
import restriccionesRoutes from "./modules/restricciones/restricciones.routes";
import avanceTerrenoRoutes from "./modules/avance-terreno/avance-terreno.routes";
import lookaheadRoutes from "./modules/lookahead/lookahead.routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4173",
  "http://localhost:5173",
  "http://172.16.43.59:4173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.options(/.*/, cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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

app.use("/auth", authRoutes);
app.use("/proyectos", proyectosRoutes);
app.use("/actividades", actividadesRoutes);
app.use("/plan-semanal", planSemanalRoutes);
app.use("/restricciones", restriccionesRoutes);
app.use("/avance-terreno", avanceTerrenoRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/lookahead", lookaheadRoutes);

export default app;