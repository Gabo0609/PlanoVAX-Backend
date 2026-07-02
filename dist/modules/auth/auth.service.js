"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../config/prisma"));
async function registerUser(data) {
    const existe = await prisma_1.default.usuario.findUnique({
        where: { email: data.email },
    });
    if (existe) {
        throw new Error("El email ya está registrado");
    }
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const usuario = await prisma_1.default.usuario.create({
        data: {
            nombre: data.nombre,
            email: data.email,
            password: hashedPassword,
            rol: data.rol,
            cargo: data.cargo,
        },
    });
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
}
async function loginUser(email, password) {
    const usuario = await prisma_1.default.usuario.findUnique({
        where: { email },
    });
    if (!usuario) {
        throw new Error("Credenciales inválidas");
    }
    if (!usuario.activo) {
        throw new Error("Usuario inactivo");
    }
    const passwordValida = await bcryptjs_1.default.compare(password, usuario.password);
    if (!passwordValida) {
        throw new Error("Credenciales inválidas");
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET no está configurado");
    }
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";
    const token = jsonwebtoken_1.default.sign({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        cargo: usuario.cargo,
    }, jwtSecret, {
        expiresIn: jwtExpiresIn,
    });
    const { password: _, ...usuarioSinPassword } = usuario;
    return {
        token,
        usuario: usuarioSinPassword,
    };
}
//# sourceMappingURL=auth.service.js.map