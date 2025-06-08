import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import api from "@/lib/api";
import { Category } from "@/types";

export default function Header() {
  const [cats, setCats] = useState<Category[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    api
      .get<Category[]>("/api/categories")
      .then((r) => setCats(r.data))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <img
            src="/images/logo.jpg"
            alt="Mazal Importaciones"
            className="h-12"
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-brand-medium">
            Inicio
          </Link>

          {/* Dropdown categorías */}
          <div className="relative" onClick={() => setDropdownOpen((o) => !o)}>
            <button className="flex items-center text-gray-700 hover:text-brand-medium focus:outline-none">
              Categorías <FaAngleDown className="ml-1" />
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                {cats.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/categories/${c.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/about-us"
            className="text-gray-700 hover:text-brand-medium"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-brand-medium"
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-brand-medium"
            >
              Inicio
            </Link>

            {/* Mobile dropdown */}
            <div>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-brand-medium focus:outline-none"
              >
                Categorías <FaAngleDown />
              </button>
              {dropdownOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  {cats.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/categories/${c.slug}`}
                        className="block text-gray-700 hover:text-brand-medium"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/about-us"
              className="block text-gray-700 hover:text-brand-medium"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-brand-medium"
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
