import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Empresa</h3>
          <ul>
            <li>
              <Link href="/about-us" className="hover:text-brand-light">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-brand-light">
                Aviso Legal
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Productos</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/categories/cadenas-y-accesorios"
                className="hover:text-brand-light"
              >
                Cadenas y Accesorios
              </Link>
            </li>
            <li>
              <Link
                href="/categories/herrajes"
                className="hover:text-brand-light"
              >
                Herrajes
              </Link>
            </li>
            {/* etc. */}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contacto</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://wa.me/5491145376452"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-brand-light"
              >
                <FaWhatsapp className="text-2xl" />
                <span>+549 11 4537-6452</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@mazalimportaciones.com.ar"
                className="flex items-center space-x-2 hover:text-brand-light"
                target="_blank"
              >
                <FaEnvelope className="text-2xl" />
                <span>info@mazalimportaciones.com.ar</span>
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <a
                href="https://maps.app.goo.gl/3HCCsZprzhKRMJqL8"
                className="flex items-center space-x-2 hover:text-brand-light"
                target="_blank"
              >
                <FaMapMarkerAlt className="text-2xl" />
                <span>Nicolás Repetto 1655, Buenos Aires</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-brand-medium text-center py-4">
        © {new Date().getFullYear()} Mazal Importaciones
      </div>
    </footer>
  );
}
