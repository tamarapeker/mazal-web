import { GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";

export const getStaticProps: GetStaticProps = async () => {
  const { data: categories } = await api.get<Category[]>("/api/categories");
  return { props: { categories } };
};

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </Layout>
  );
}
