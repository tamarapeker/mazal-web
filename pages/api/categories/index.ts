import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // List all the categories (parentId = null)
    const cats = await prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
    });
    return res.status(200).json(cats);
  }
  if (req.method === "POST") {
    // Create category or subcategory
    const { name, slug, imageUrl, parentId } = req.body;
    const cat = await prisma.category.create({
      data: { name, slug, imageUrl, parentId },
    });
    return res.status(201).json(cat);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
