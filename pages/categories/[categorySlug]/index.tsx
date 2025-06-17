import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Category, Product } from "@/types";
import { useRouter } from "next/router";
import api from "@/lib/api";
import { useEffect, useState } from "react";

// type Props = {
//   category: Category;
//   products: Product[];
// };

// interface CategoryParams extends ParsedUrlQuery {
//   categorySlug: string;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   // 1) fetch all root categories
//   const { data: cats } = await api.get<Category[]>("/api/categories");
//   // 2) for each, fetch its children/subcategories
//   const paths: { params: { categorySlug: string } }[] = [];
//   for (const cat of cats) {
//     const { data: fullCat } = await api.get<
//       Category & { children: Category[] }
//     >(`/api/categories/${cat.slug}`);
//     fullCat.children.forEach(() => {
//       paths.push({ params: { categorySlug: cat.slug } });
//     });
//   }
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<Props, CategoryParams> = async ({
//   params,
// }) => {
//   if (!params) {
//     return { notFound: true };
//   }
//   const { categorySlug } = params;
//   const { data: cat } = await api.get<Category & { children: Category[] }>(
//     `/api/categories/${categorySlug}`
//   );

//   if (!cat) return { notFound: true };

//   // ahora fetch products de la sub
//   const { data: products } = await api.get<Product[]>(
//     `/api/products?categoryId=${cat.id}`
//   );

//   return { props: { category: cat, products } };
// };

// export const getStaticPaths: GetStaticPaths<CategoryParams> = async () => {
//   const cats = await prisma.category.findMany({ select: { slug: true } });
//   return {
//     paths: cats.map((c) => ({ params: { categorySlug: c.slug } })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props, CategoryParams> = async ({
//   params,
// }) => {
//   if (!params) return { notFound: true };
//   const { categorySlug } = params;

//   const category = await prisma.category.findUnique({
//     where: { slug: categorySlug },
//     include: { children: true },
//   });
//   if (!category) return { notFound: true };

//   const products = await prisma.product.findMany({
//     where: { categoryId: category.id },
//     include: { images: true },
//   });

//   return {
//     props: { category, products },
//   };
// };

export default function ProductsSub() {
  const { query, isReady } = useRouter();
  const slug = Array.isArray(query.categorySlug)
    ? query.categorySlug[0]
    : query.categorySlug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isReady || !slug) return;

    api
      .get<Category & { children: Category[] }>(`/api/categories/${slug}`)
      .then((r) => {
        const cat = r.data;
        setCategory(cat);

        return api.get<Product[]>(`/api/products?categoryId=${cat.id}`);
      })
      .then((r2) => setProducts(r2.data))
      .catch((err) => {
        console.error(err);
        // manejar error
      });
  }, [isReady, slug]);

  if (!category) return <Layout>Loading…</Layout>;

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
