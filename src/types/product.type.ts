export interface ProductType {
  id: string;
  category: "Cameras" | "Sensors" | "Plans" | "Accessories";
  title: string;
  description: string;
  learnMoreUrl?: string;
  image: string;
  originalPrice: number | null;
  currentPrice: number;
  variants: ProductVariant[] | null;
  defaultVariant: string | null;
  seedQty: Record<string, number>;
}

export interface ProductVariant {
  id: string;
  label: string;
  swatch: string;
  image: string;
}
