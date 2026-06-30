import prisma from "../src/config/prisma";

const zonas = `D D D D D D D D D D D D D D D A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 A1 C C C C C C C C C C C C C C C B B B B B B B B B B B B B B B B B B B A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A2 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3 A3`.split(" ");

const casas = `1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 9 8 7 6 5 4 3 2 1 15 14 13 12 11 10 11 10 9 8 7 6 5 4 3 2 1 19 18 17 16 15 14 13 12 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 17 18 19 20 21 22 23 24 25 26 27 28 29 30 44 43 42 41 40 39 38 37 36 35 34 33 32 31`
  .split(" ")
  .map(Number);

const modelos = `B3 C4 C4 B5 B5 B5 B5 C3 C3 C3 C3 B5 B5 C3 C3 C3 C3 C4 C4 C4 C4 B5 B5 B5 B5 C4 C4 C4 C4 B5 B5 B5 B5 B5 B5 B3 C4 C4 C4 C4 B5 B5 C4 C4 C3 C3 C4 C4 C3 C3 B3 C4 C4 C3 C3 C4 C4 C4 C4 B5 B5 C4 C4 C3 C3 C4 C4 C3 C3 B5 B5 C4 C4 B5 B5 B5 B5 C3 C3 B5 B5 B5 B5 C4 C4 C4 C4 B5 B5 B5 B5 C3 C3 B5 B5 B5 B5 C4 C4 B5 B5 C4 C4 B5 B5 B5 B5 C3 C3 B5 B5 B5 B5 C4 C4 B5 B5 C4 C4 B5 B5 B5 B5 C4 C4 B5 B5 B5 B5`.split(" ");

async function main() {
  if (zonas.length !== casas.length || casas.length !== modelos.length) {
    throw new Error(
      `Datos inconsistentes: zonas=${zonas.length}, casas=${casas.length}, modelos=${modelos.length}`
    );
  }

  const proyecto = await prisma.proyecto.findFirst({
    where: { activo: true },
    orderBy: { createdAt: "asc" },
  });

  if (!proyecto) {
    throw new Error("No existe proyecto activo para asociar viviendas.");
  }

  for (let i = 0; i < casas.length; i++) {
    await prisma.vivienda.upsert({
      where: {
        numero_zona_proyectoId: {
          numero: casas[i],
          zona: zonas[i],
          proyectoId: proyecto.id,
        },
      },
      update: {
        modelo: modelos[i],
        activo: true,
      },
      create: {
        numero: casas[i],
        zona: zonas[i],
        modelo: modelos[i],
        proyectoId: proyecto.id,
      },
    });
  }

  console.log(`Viviendas cargadas correctamente: ${casas.length}`);
}

main()
  .catch((error) => {
    console.error("Error cargando viviendas:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });