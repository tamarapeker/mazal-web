export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  parentId?: number;
  children?: Category[];
  parent?: Category;
}

export interface FormatDetails {
  id: number;
  formatId: number;
  measurement: string;
  code: string;
  unitsPerBulk?: number;
}

export interface ProductFormat {
  id: number;
  productId: number;
  saleUnit: string;
  minQuantity?: number;
  minUnit?: string;
  unitsPerBulk?: number; // valor por defecto si ningún detail lo sobreescribe
  details: FormatDetails[];
}

export interface ProductImage {
  id: number;
  productId: number;
  url: string;
  altText?: string;
  order: number;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description?: string;
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
