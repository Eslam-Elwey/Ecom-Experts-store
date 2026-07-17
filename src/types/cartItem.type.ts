import type { CategoryType } from "./product.type";

export type CartItemType = {
  productId: string;
  category: CategoryType;
  variantId: string;
  quantity: number;
  title: string;
  image: string | undefined;
  originalPrice: number | null;
  currentPrice: number;
  maxNum : number
};
