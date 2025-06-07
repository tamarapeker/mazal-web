// pages/api/formats/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        // Lista todos los formatos, opcionalmente puedes filtrar por productId
        const { productId } = req.query;
        const where: Prisma.ProductFormatWhereInput = productId
          ? { productId: Number(productId) }
          : {};

        const formats = await prisma.productFormat.findMany({
          where,
        });
        return res.status(200).json(formats);
      }

      case "POST": {
        // Crea un nuevo ProductFormat
        const {
          productId,
          packagingType,
          packagingSize,
          packagingUnit,
          measurements,
        } = req.body as {
          productId: number;
          packagingType: string;
          packagingSize?: number;
          packagingUnit?: string;
          measurements: string[];
        };

        // Validaciones mínimas
        if (!productId || !packagingType || !Array.isArray(measurements)) {
          return res
            .status(400)
            .json({
              error: "productId, packagingType y measurements son obligatorios",
            });
        }

        const newFormat = await prisma.productFormat.create({
          data: {
            product: { connect: { id: productId } },
            packagingType,
            packagingSize,
            packagingUnit,
            measurements,
          },
        });
        return res.status(201).json(newFormat);
      }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API /formats error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
