import Layout from "@/components/Layout";
import Breadcrumbs, { Crumb } from "@/components/Breadcrumbs";
import {
  Category,
  FormatDetails,
  Product,
  ProductFormat,
  ProductImage,
} from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/api";

// type Props = {
//   product: Product & {
//     formats: ProductFormat[];
//     images: ProductImage[];
//     category: Category;
//   };
// };

// interface ProductParams extends ParsedUrlQuery {
//   id: string;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data: products } = await api.get<Product[]>("/api/products");
//   return {
//     paths: products.map((p) => ({ params: { id: p.id.toString() } })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   if (!params?.id) return { notFound: true };

//   const { data: product } = await api.get<Props["product"]>(
//     `/api/products/${params!.id}`
//   );
//   return { props: { product } };
// };

// export const getStaticPaths: GetStaticPaths<ProductParams> = async () => {
//   const list = await prisma.product.findMany({ select: { id: true } });
//   return {
//     paths: list.map((p) => ({ params: { id: String(p.id) } })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props, ProductParams> = async ({
//   params,
// }) => {
//   if (!params?.id) return { notFound: true };
//   const id = Number(params.id);

//   const prod = await prisma.product.findUnique({
//     where: { id },
//     include: {
//       category: true,
//       formats: { include: { details: true } },
//       images: true,
//     },
//   });
//   if (!prod) return { notFound: true };

//   return {
//     props: {
//       product: {
//         id: prod.id,
//         code: prod.code,
//         name: prod.name,
//         description: prod.description ?? "",
//         categoryId: prod.categoryId, // ← aquí lo adds
//         category: prod.category,
//         formats: prod.formats,
//         images: prod.images,
//       },
//     },
//   };
// };

export default function ProductDetail() {
  const { query, isReady } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const [product, setProduct] = useState<
    | (Product & {
        formats: (Omit<ProductFormat, "details"> & {
          details: FormatDetails[];
        })[];
        images: ProductImage[];
        category: Category;
      })
    | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !id) return;
    setLoading(true);
    api
      .get(`/api/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isReady, id]);

  if (loading) {
    return (
      <Layout>
        <p className="text-center py-20">Cargando producto…</p>
      </Layout>
    );
  }
  if (!product) {
    return (
      <Layout>
        <p className="text-center py-20">Producto no encontrado.</p>
      </Layout>
    );
  }

  const category = product.category;
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Categorías", href: "/categories" },
    { label: category.name, href: `/categories/${category.slug}` },
    { label: product.name, href: "" },
  ].filter(Boolean);

  return (
    <Layout>
      <Breadcrumbs items={crumbs as Crumb[]} />
      <div className="md:flex md:space-x-8">
        {/* Galería… */}
        <div className="md:w-1/2">
          <img
            src={
              `/images/${product.images[0]?.url}.png` ||
              "/images/placeholder.jpg"
            }
            alt={product.name}
            className="w-full h-auto rounded"
          />
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Detalle y tabla de presentaciones */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="mb-4">{product.description}</p>

          <div className="mb-8">
            {product.formats.map((f) => {
              // ¿Alguna medida tiene unitsPerBulk distinto de null?
              const hasOverrideUPB = f.details.some(
                (d) => d.unitsPerBulk != null
              );
              // valor por defecto si no hay override
              const defaultUPB = f.unitsPerBulk;

              return (
                <div key={f.id} className="mb-12">
                  {/* Datos genéricos del formato */}
                  <div className="mb-4 space-y-1">
                    <p>
                      <span className="font-semibold">Empaque:</span>{" "}
                      {f.saleUnit}
                    </p>
                    <p>
                      <span className="font-semibold">Cantidad mínima:</span>{" "}
                      {f.minQuantity}
                      {f.minUnit}
                    </p>
                    {/** Si NO hay override en detalles y existe defaultUPB, muéstralo aquí */}
                    {!hasOverrideUPB && defaultUPB != null && (
                      <p>
                        <span className="font-semibold">
                          Unidades por bulto:
                        </span>{" "}
                        {defaultUPB}
                        {f.minUnit}
                      </p>
                    )}
                  </div>

                  {/* Tabla de medidas / códigos (y columna UPB solo si hay override) */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Medida</th>
                          <th className="border px-4 py-2 text-left">Código</th>
                          {hasOverrideUPB && (
                            <th className="border px-4 py-2 text-left">
                              Unidades por bulto
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {f.details.map((d) => {
                          // si la medida no tiene override, cae al defaultUPB
                          const upb = d.unitsPerBulk ?? defaultUPB;
                          return (
                            <tr
                              key={`${f.id}-${d.id}`}
                              className="odd:bg-white even:bg-gray-50"
                            >
                              <td className="border px-4 py-2">
                                {d.measurement}
                              </td>
                              <td className="border px-4 py-2">{d.code}</td>
                              {hasOverrideUPB && (
                                <td className="border px-4 py-2">
                                  {upb}
                                  {f.minUnit}
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
