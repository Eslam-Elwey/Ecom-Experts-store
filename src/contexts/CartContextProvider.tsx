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

  const addOrUpdateItem = (item: CartItemType) => {
    setStoredItems((prev) => {
      const index = prev.findIndex((ele) => {
        return (
          ele.productId === item.productId && ele.variantId === item.variantId
        );
      });

      //creat new one
      if (index === -1) {
        return [...prev, item];
      }

      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        quantity: item.quantity,
      };

      return updated.filter((item) => item.quantity > 0);
    });
  };

  function removeItem(productId: string, variantId: string) {
    setStoredItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      ),
    );
  }

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
        removeItem,
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
