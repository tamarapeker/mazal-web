import api from "@/lib/api";
import Layout from "@/components/Layout";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";
import { useEffect, useState } from "react";

// export const getStaticProps: GetStaticProps = async () => {
//   const { data: categories } = await api.get<Category[]>("/api/categories");
//   return { props: { categories } };
// };

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Category[]>("/api/categories")
      .then((r) => setCategories(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Categorías</h1>
      {loading ? (
        <p>Cargando categorías…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </Layout>
  );
}
