const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Recupero los productos
  const zinc = await prisma.product.findUnique({ where: { code: "CADZ" } });
  const band = await prisma.product.findUnique({ where: { code: "CADBA" } });
  const nudo = await prisma.product.findUnique({ where: { code: "CADN" } });

  // 1) Cadena Zincada
  const fmtZ = await prisma.productFormat.create({
    data: {
      productId: zinc!.id,
      saleUnit: "Balde",
      minQuantity: 12.5,
      minUnit: "kg",
      unitsPerBulk: 12.5,
      details: {
        create: [
          { measurement: "N° 30 – 3 mm", code: "CADZ030" },
          { measurement: "N° 35 – 3,5 mm", code: "CADZ035" },
          { measurement: "N° 40 – 4 mm", code: "CADZ040" },
          { measurement: "N° 45 – 4,5 mm", code: "CADZ045" },
          { measurement: "N° 50 – 5 mm", code: "CADZ050" },
          { measurement: "N° 55 – 5,5 mm", code: "CADZ055" },
          { measurement: "N° 60 – 6 mm", code: "CADZ060" },
          { measurement: "N° 70 – 7 mm", code: "CADZ070" },
          { measurement: "N° 80 – 8 mm", code: "CADZ080" },
          { measurement: "N° 90 – 9 mm", code: "CADZ090" },
          { measurement: "N° 100 – 10 mm", code: "CADZ100" },
          { measurement: "N° 110 – 11 mm", code: "CADZ110" },
        ],
      },
    },
  });

  // 2) Cadena Banderola – dos variantes
  const fmtB = await prisma.productFormat.create({
    data: {
      productId: band!.id,
      saleUnit: "Bolsa",
      minQuantity: 25,
      minUnit: "m",
      details: {
        create: [
          { measurement: "Simple", code: "CADBAS", unitsPerBulk: 750 },
          { measurement: "Doble", code: "CADBAD", unitsPerBulk: 500 },
        ],
      },
    },
  });

  // 3) Cadena Nudo Galvanizada
  const fmtN = await prisma.productFormat.create({
    data: {
      productId: nudo!.id,
      saleUnit: "Carrete",
      minQuantity: 25,
      minUnit: "m",
      unitsPerBulk: 25,
      details: {
        create: [
          { measurement: "N° 18 – 1,2 mm", code: "CADN18" },
          { measurement: "N° 17 – 1,4 mm", code: "CADN17" },
          { measurement: "N° 15 – 1,8 mm", code: "CADN15" },
          { measurement: "N° 13 – 2,0 mm", code: "CADN13" },
        ],
      },
    },
  });

  console.log("✔️ Formatos cargados");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
