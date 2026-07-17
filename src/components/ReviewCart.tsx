import { useMemo } from "react";
import { useCart } from "../hooks/useCart";
import type { CartItemType } from "../types/cartItem.type";
import ReviewSection from "./ReviewSection";
import type { CategoryType } from "../types/product.type";

export default function ReviewCart() {
  const { items } = useCart();
  const grouped = useMemo(() => {
    return items.reduce<Record<CategoryType, CartItemType[]>>(
      (acc, item) => {
        acc[item.category].push(item);
        return acc;
      },
      {
        Cameras: [],
        Sensors: [],
        Accessories: [],
        Plans: [],
      },
    );
  }, [items]);

  return (
    <div>
      <ReviewSection title="Cameras" items={grouped.Cameras} />

      <ReviewSection title="Sensors" items={grouped.Sensors} />

      <ReviewSection title="Accessories" items={grouped.Accessories} />

      <ReviewSection title="Plan" items={grouped.Plans} />
    </div>
  );
}
