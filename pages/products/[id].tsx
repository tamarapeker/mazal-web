import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Category, Product } from "@/types";

type Props = { product: Product & { formats: any[]; images: any[] } };

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await api.get<Product[]>("/api/products");
  return {
    paths: products.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { data: product } = await api.get<
    Product & {
      formats: any[];
      images: any[];
      category: Category & { parent?: Category };
    }
  >(`/api/products/${params!.id}`);
  return { props: { product } };
};

export default function ProductDetail({ product }: Props) {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/categories" },
          {
            label: product.category?.parent ? product.category.parent.name : "",
            href: product.category?.parent
              ? `/categories/${product.category.parent.slug}`
              : "",
          },
          {
            label: product.category ? product.category.name : "",
            href: product.category
              ? `/categories/${product.category.slug}`
              : "",
          },
          { label: product.name, href: "" },
        ]}
      />
      <div className="md:flex md:space-x-8">
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
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="mb-4">{product.description}</p>
          <div className="mb-8">
            <h2 className="font-medium text-xl mb-4">Presentaciones</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Empaque</th>
                    <th className="border px-4 py-2 text-left">Cantidad</th>
                    <th className="border px-4 py-2 text-left">Medidas</th>
                  </tr>
                </thead>
                <tbody>
                  {product.formats.map((f) => (
                    <tr key={f.id} className="odd:bg-white even:bg-gray-50">
                      <td className="border px-4 py-2">{f.packagingType}</td>
                      <td className="border px-4 py-2">
                        {f.packagingSize}
                        {f.packagingUnit}
                      </td>
                      <td className="border px-4 py-2">
                        {f.measurements.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
