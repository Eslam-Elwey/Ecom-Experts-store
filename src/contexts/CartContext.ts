import { createContext } from "react";
import type { CartItemType } from "../types/cartItem.type";

type CartContextType = {
  items: CartItemType[];
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  isSaved: boolean;
  addOrUpdateItem: (item: CartItemType) => void;
  removeItem: (productId: string, variantId: string) => void;
  getItemQuantity: (productId: string, variantId: string) => number;
  clearAll: () => void;
  subtotalBefore: number;
  subtotalAfter: number;
  savings: number;
};

export const CartContext = createContext<CartContextType | null>(null);
