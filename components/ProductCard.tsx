import { Product } from "@/types";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const imgUrl = product.images
    ? product.images[0]?.url
    : "/images/placeholder.jpg";
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white shadow hover:shadow-lg rounded-lg overflow-hidden"
    >
      <img
        src={`/images/${imgUrl}.png`}
        alt={product.name}
        className="object-cover w-full h-40"
      />
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
      </div>
    </Link>
  );
}
