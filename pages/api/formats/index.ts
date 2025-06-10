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
          include: {
            details: true,
          },
        });
        return res.status(200).json(formats);
      }

      case "POST": {
        // Crea un nuevo ProductFormat
        const {
          productId,
          saleUnit,
          minQuantity,
          minUnit,
          unitsPerBulk,
          details,
        } = req.body as {
          productId: number;
          saleUnit: string;
          minQuantity?: number;
          minUnit?: string;
          unitsPerBulk?: number;
          details: {
            measurement: string;
            code: string;
            unitsPerBulk?: number;
          }[];
        };

        // Validaciones mínimas
        if (
          !productId ||
          !saleUnit ||
          !Array.isArray(details) ||
          details.some(
            (d) =>
              typeof d.measurement !== "string" || typeof d.code !== "string"
          )
        ) {
          return res.status(400).json({
            error:
              "productId, saleUnit y details (array de {measurement,code}) son obligatorios",
          });
        }

        const newFormat = await prisma.productFormat.create({
          data: {
            product: { connect: { id: productId } },
            saleUnit,
            minQuantity,
            minUnit,
            unitsPerBulk,
            details: {
              create: details.map((d) => ({
                measurement: d.measurement,
                code: d.code,
                unitsPerBulk: d.unitsPerBulk,
              })),
            },
          },
          include: {
            details: true,
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
