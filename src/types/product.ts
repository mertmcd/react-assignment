export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  rating: number;
  reviews?: string[];
  thumbnail?: string;
  images?: string[];
  stock: number;
  availabilityStatus?: string;
  discountPercentage?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  category: string;
  tags: string[];
  brand?: string;
  sku: string;
  meta: {
    barcode: string;
  };
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
}
export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  id: string;
}
