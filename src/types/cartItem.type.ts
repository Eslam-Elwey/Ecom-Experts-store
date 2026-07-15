export type CartItemType = {
  productId: string;
  category: string;
  variantId: string;
  quantity: number;
  title: string;
  image: string | undefined;
  originalPrice: number | null;
  currentPrice: number;
};
