"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const auth_service_1 = require("./auth.service");
async function register(req, res) {
    try {
        const usuario = await (0, auth_service_1.registerUser)(req.body);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            data: usuario,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Error al registrar usuario",
        });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await (0, auth_service_1.loginUser)(email, password);
        res.json({
            message: "Login correcto",
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            message: error instanceof Error
                ? error.message
                : "Error al iniciar sesión",
        });
    }
}
//# sourceMappingURL=auth.controller.js.map