import { Router } from "express";
import { login, register } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Usuario autenticado",
    data: (req as any).user,
  });
});

export default router;