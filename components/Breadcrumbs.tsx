import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-gray-600 text-sm mb-4">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center">
              {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
              {isLast || !crumb.href ? (
                <span className="text-gray-500">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-brand-medium">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
