import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Category, Product } from "@/types"; // crea un archivo types.ts si quieres
import { ParsedUrlQuery } from "querystring";

type Props = {
  category: Category;
  products: Product[];
};

interface CategoryParams extends ParsedUrlQuery {
  categorySlug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 1) fetch all root categories
  const { data: cats } = await api.get<Category[]>("/api/categories");
  // 2) for each, fetch its children/subcategories
  const paths: { params: { categorySlug: string } }[] = [];
  for (const cat of cats) {
    const { data: fullCat } = await api.get<
      Category & { children: Category[] }
    >(`/api/categories/${cat.slug}`);
    fullCat.children.forEach(() => {
      paths.push({ params: { categorySlug: cat.slug } });
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, CategoryParams> = async ({
  params,
}) => {
  if (!params) {
    return { notFound: true };
  }
  const { categorySlug } = params;
  const { data: cat } = await api.get<Category & { children: Category[] }>(
    `/api/categories/${categorySlug}`
  );

  // ahora fetch products de la sub
  const { data: products } = await api.get<Product[]>(
    `/api/products?categoryId=${cat.id}`
  );

  return { props: { category: cat, products } };
};

export default function ProductsSub({ category, products }: Props) {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/categories" },
          { label: category.name, href: "" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-6">{category.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Layout>
  );
}
