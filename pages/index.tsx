import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/api";
import { Product } from "@/types";
import Link from "next/link";
import Carousel from "@/components/Carousel";

export const getStaticProps: GetStaticProps = async () => {
  // Para arrancar, traemos los 4 primeros
  const { data: products } = await api.get<Product[]>("/api/products?take=4");
  return { props: { products } };
};

export default function Home({ products }: { products: Product[] }) {
  return (
    <Layout>
      <Carousel />

      {/* Productos destacados */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* → Call to action para explorar categorías ← */}
      <section className="mt-12 bg-brand-medium text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Buscas algo en particular?</h2>
        <p className="mb-6">
          Descubre nuestras categorías de productos y encuentra lo que
          necesitas.
        </p>
        <Link
          href="/categories"
          className="inline-block bg-white text-brand-medium font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Ver todas las categorías
        </Link>
      </section>
    </Layout>
  );
}
