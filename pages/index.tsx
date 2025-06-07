import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/api";
import { Product } from "@/types";

export const getStaticProps: GetStaticProps = async () => {
  // Para arrancar, traemos los 4 primeros
  const { data: products } = await api.get<Product[]>("/api/products?take=4");
  return { props: { products } };
};

export default function Home({ products }: { products: Product[] }) {
  return (
    <Layout>
      {/* Carrusel */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <img src="/images/slide1.png" className="object-cover w-full h-full" />
      </div>

      {/* Productos destacados */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
