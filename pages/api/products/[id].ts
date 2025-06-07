import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (req.method === "GET") {
    const prod = await prisma.product.findUnique({
      where: { id },
      include: {
        formats: true,
        images: true,
        category: { include: { parent: true } },
      },
    });
    return res.json(prod);
  }
  if (req.method === "PUT") {
    const { code, name, description, categoryId } = req.body;
    const prod = await prisma.product.update({
      where: { id },
      data: { code, name, description, categoryId },
    });
    return res.json(prod);
  }
  if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end();
}
