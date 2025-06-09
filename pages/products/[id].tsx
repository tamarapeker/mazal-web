import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import Breadcrumbs, { Crumb } from "@/components/Breadcrumbs";
import { Category, Product, ProductFormat, ProductImage } from "@/types";

type Props = {
  product: Product & {
    formats: ProductFormat[];
    images: ProductImage[];
    category: Category;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await api.get<Product[]>("/api/products");
  return {
    paths: products.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { data: product } = await api.get<Props["product"]>(
    `/api/products/${params!.id}`
  );
  return { props: { product } };
};

export default function ProductDetail({ product }: Props) {
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
