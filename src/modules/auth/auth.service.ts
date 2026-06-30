import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";

type RolUsuario =
  | "ADMINISTRADOR"
  | "JEFE_TERRENO"
  | "AYUDANTE_TERRENO"
  | "OFICINA_TECNICA";

type RegisterInput = {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
  cargo?: string;
};

export async function registerUser(data: RegisterInput) {
  const existe = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (existe) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const usuario = await prisma.usuario.create({
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

export async function loginUser(email: string, password: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Credenciales inválidas");
  }

  if (!usuario.activo) {
    throw new Error("Usuario inactivo");
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    throw new Error("Credenciales inválidas");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está configurado");
  }

const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

const token = jwt.sign(
  {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    cargo: usuario.cargo,
  },
  jwtSecret as string,
  {
    expiresIn: jwtExpiresIn as any,
  }
);
  const { password: _, ...usuarioSinPassword } = usuario;

  return {
    token,
    usuario: usuarioSinPassword,
  };
}