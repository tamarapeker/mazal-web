import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

type Category = { id: number; name: string; slug: string };

export default function Header() {
  const [cats, setCats] = useState<Category[]>([]);
  useEffect(() => {
    axios
      .get<Category[]>("/api/categories")
      .then((r) => setCats(r.data))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <img
            src="/images/logo.jpg"
            alt="Mazal Importaciones"
            className="h-12"
          />
        </Link>
        <nav className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:text-brand-medium">
            Inicio
          </Link>
          <div className="relative group">
            <button className="hover:text-brand-medium">Categorías ▾</button>
            <div className="absolute top-full left-0 bg-white shadow-md rounded mt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
              <ul className="py-2">
                {cats.map((c) => (
                  <li key={c.id} className="block px-4 py-1 hover:bg-gray-100">
                    <Link href={`/categories/${c.slug}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/about-us" className="hover:text-brand-medium">
            Sobre Nosotros
          </Link>
          <Link href="/contact" className="hover:text-brand-medium">
            Contacto
          </Link>
        </nav>
        {/* mobile menu placeholder */}
      </div>
    </header>
  );
}
