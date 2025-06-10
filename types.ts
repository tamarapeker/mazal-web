export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  parentId?: number | null;
  children?: Category[] | null;
  parent?: Category | null;
}

export interface FormatDetails {
  id: number;
  formatId: number;
  measurement: string;
  code: string;
  unitsPerBulk?: number | null;
}

export interface ProductFormat {
  id: number;
  productId: number;
  saleUnit: string;
  minQuantity?: number | null;
  minUnit?: string | null;
  unitsPerBulk?: number | null; // valor por defecto si ningún detail lo sobreescribe
  details: FormatDetails[];
}

export interface ProductImage {
  id: number;
  productId: number;
  url: string;
  altText?: string | null;
  order: number;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  categoryId: number;
  category?: Category;
  formats?: ProductFormat[];
  images?: ProductImage[];
}

export interface User {
  id: number;
  email: string;
  password?: string; // solo para operaciones sensibles
}
