import { useEffect, useState } from "react";
import type { CartItemType } from "../types/cartItem.type";
import { CartContext } from "./CartContext";
import type { MetaType } from "../types/meta.type";

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const STORAGE_KEY = "cart-items";

  const [storedItems, setStoredItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    const saved = localStorage.getItem("isSaved");
    return saved ? JSON.parse(saved) : false;
  });

  const [meta, setMeta] = useState<null | MetaType>(null);

  const addOrUpdateItem = (
    item: Omit<CartItemType, "quantity">,
    value: React.SetStateAction<number>,
  ) => {
    setStoredItems((prev) => {
      const index = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId,
      );

      const current = index === -1 ? 0 : prev[index].quantity;

      const next = typeof value === "function" ? value(current) : value;

      if (index === -1) {
        if (next <= 0) return prev;

        return [
          ...prev,
          {
            ...item,
            quantity: next,
          },
        ];
      }

      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        quantity: next,
      };

      return updated.filter((i) => i.quantity > 0);
    });
  };

  const updateQuantity = (
  productId: string,
  variantId: string,
  value: React.SetStateAction<number>,
) => {
  setStoredItems(prev =>
    prev
      .map(item => {
        if (
          item.productId !== productId ||
          item.variantId !== variantId
        ) {
          return item;
        }

        const next =
          typeof value === "function"
            ? value(item.quantity)
            : value;

        return {
          ...item,
          quantity: next,
        };
      })
      .filter(item => item.quantity > 0),
  );
};

  function getItemQuantity(productId: string, variantId: string) {
    return (
      storedItems.find(
        (item) => item.productId === productId && item.variantId === variantId,
      )?.quantity ?? 0
    );
  }

  function clearAll() {
    setStoredItems(() => []);
  }

  const subtotalBefore = Number(
    storedItems
      .reduce(
        (sum, item) =>
          sum + (item.originalPrice ?? item.currentPrice) * item.quantity,
        0,
      )
      .toFixed(2),
  );

  const subtotalAfter = Number(
    storedItems
      .reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)
      .toFixed(2),
  );

  const savings = subtotalBefore - subtotalAfter;

  useEffect(() => {
    if (!isSaved) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
  }, [storedItems, isSaved]);

  return (
    <CartContext.Provider
      value={{
        addOrUpdateItem,
        updateQuantity,
        getItemQuantity,
        clearAll,
        items: storedItems,
        setIsSaved,
        isSaved,
        savings,
        subtotalAfter,
        subtotalBefore,
        meta,
        setMeta,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
