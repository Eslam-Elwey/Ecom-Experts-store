import { createContext } from "react";
import type { CartItemType } from "../types/cartItem.type";
import type { MetaType } from "../types/meta.type";

type CartContextType = {
  items: CartItemType[];
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  isSaved: boolean;
  addOrUpdateItem: (
    item: Omit<CartItemType, "quantity">,
    value: React.SetStateAction<number>,
  ) => void;
  getItemQuantity: (productId: string, variantId: string) => number;
  clearAll: () => void;
  subtotalBefore: number;
  subtotalAfter: number;
  savings: number;
  meta: MetaType | null;
  setMeta: React.Dispatch<React.SetStateAction<MetaType | null>>;
  updateQuantity: (
    productId: string,
    variantId: string,
    value: React.SetStateAction<number>,
  ) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
