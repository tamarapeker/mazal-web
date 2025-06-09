import { Category } from "@/types";
import Link from "next/link";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white shadow hover:shadow-lg rounded-lg overflow-hidden"
    >
      {category.imageUrl ? (
        <img
          src={`/images/${category.imageUrl}.png`}
          alt={category.name}
          className="object-cover w-full h-40"
        />
      ) : (
        <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
          <span className="text-gray-400">Sin imagen</span>
        </div>
      )}
      <div className="p-4 text-center">
        <h3 className="font-medium">{category.name}</h3>
      </div>
    </Link>
  );
}
