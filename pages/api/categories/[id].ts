// pages/api/categories/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const param = String(req.query.id || req.query.slug); // puede venir id o slug

  // Decide si es numérico o no
  const where = /^\d+$/.test(param) ? { id: Number(param) } : { slug: param };

  if (req.method === "GET") {
    const cat = await prisma.category.findUnique({
      where,
      include: { children: true, products: true },
    });
    if (!cat) return res.status(404).json({ error: "Categoría no encontrada" });
    return res.status(200).json(cat);
  }
  // ... PUT, DELETE si los necesitas
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
