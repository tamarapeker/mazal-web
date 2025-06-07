import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId: Number(categoryId) } : {};

    const prods = await prisma.product.findMany({
      where,
      include: { formats: true, images: true },
    });
    return res.json(prods);
  }
  if (req.method === "POST") {
    const { code, name, description, categoryId } = req.body;
    const prod = await prisma.product.create({
      data: { code, name, description, categoryId },
    });
    return res.status(201).json(prod);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
