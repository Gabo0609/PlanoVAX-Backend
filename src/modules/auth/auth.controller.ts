import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";

export async function register(req: Request, res: Response) {
  try {
    const usuario = await registerUser(req.body);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      data: usuario,
    });
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al registrar usuario",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.json({
      message: "Login correcto",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al iniciar sesión",
    });
  }
}