import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import CategoryCard from "@/components/CategoryCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Category } from "@/types";

type Props = {
  category: Category & { children: Category[] };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: cats } = await api.get<Category[]>("/api/categories");
  return {
    paths: cats.map((c) => ({ params: { categorySlug: c.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { data: category } = await api.get<Category & { children: Category[] }>(
    `/api/categories/${params!.categorySlug}`
  );
  return { props: { category } };
};

export default function Subcategories({ category }: Props) {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/categories" },
          { label: category.name, href: "" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-8">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.children.map((sub) => (
          <CategoryCard
            key={sub.id}
            category={sub}
            parentSlug={category.slug}
          />
        ))}
      </div>
    </Layout>
  );
}
