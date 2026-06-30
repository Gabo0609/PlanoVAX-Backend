const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const tiposCnc = [
  "MO",
  "MO SUB CONTRATO",
  "MAQ / HERR",
  "DISEÑO",
  "RRHH",
  "MATERIALES",
  "CALIDAD",
  "PREVENCIÓN",
  "CLIMA",
];

async function main() {
  const proyectoExistente = await prisma.proyecto.findFirst({
    where: {
      codigo: "HLC-P2B",
    },
  });

  if (!proyectoExistente) {
    await prisma.proyecto.create({
      data: {
        nombre: "Hacienda Los Conquistadores Parcela 2B",
        codigo: "HLC-P2B",
        ubicacion: "Puente Alto",
        descripcion: "Proyecto Hacienda Los Conquistadores Parcela 2B",
        activo: true,
      },
    });
  }

  for (const nombre of tiposCnc) {
    const existe = await prisma.tipoCnc.findFirst({
      where: { nombre },
    });

    if (!existe) {
      await prisma.tipoCnc.create({
        data: {
          nombre,
          activo: true,
        },
      });
    }
  }

  console.log("Base inicial cargada correctamente");
}

main()
  .catch((error) => {
    console.error("Error cargando base inicial:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });