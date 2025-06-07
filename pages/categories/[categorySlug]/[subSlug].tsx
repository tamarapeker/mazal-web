import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/api";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Category, Product } from "@/types"; // crea un archivo types.ts si quieres

type Props = {
  category: Category;
  sub: Category & { products: Product[] };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 1) fetch all root categories
  const { data: cats } = await api.get<Category[]>("/api/categories");
  // 2) for each, fetch its children/subcategories
  const paths: { params: { categorySlug: string; subSlug: string } }[] = [];
  for (const cat of cats) {
    const { data: fullCat } = await api.get<
      Category & { children: Category[] }
    >(`/api/categories/${cat.slug}`);
    fullCat.children.forEach((sub) => {
      paths.push({ params: { categorySlug: cat.slug, subSlug: sub.slug } });
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { categorySlug, subSlug } = params as any;
  const { data: cat } = await api.get<Category & { children: Category[] }>(
    `/api/categories/${categorySlug}`
  );
  const sub = cat.children.find((c) => c.slug === subSlug)!;
  console.log("sUB", sub);
  // ahora fetch products de la sub
  const { data: products } = await api.get<Product[]>(
    `/api/products?categoryId=${sub.id}`
  );
  console.log("products", products);
  return { props: { category: cat, sub: { ...sub, products } } };
};

export default function ProductsSub({ category, sub }: Props) {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/categories" },
          { label: category.name, href: `/categories/${category.slug}` },
          { label: sub.name, href: "" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-6">{sub.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {sub.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Layout>
  );
}
