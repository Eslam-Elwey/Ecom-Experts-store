import type { CartItemType } from "../types/cartItem.type";
import Counter from "./Counter";
import { useCart } from "../hooks/useCart";
import Price from "./Price";

export default function ReviewItem({ item }: { item: CartItemType }) {
  const { updateQuantity } = useCart();

  const setItemCount: React.Dispatch<React.SetStateAction<number>> = (
    value,
  ) => {
    updateQuantity(item.productId, item.variantId, value);
  };

  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-3">
        <img
          src={item.image ?? "/default.png"}
          alt={item.title}
          className="size-10 object-contain bg-white rounded-[5px]"
        />

        <p className=" text-[#0B0D10] flex-1">{item.title}</p>
      </div>


      <div className="flex items-center gap-4 font-semibold">
      <Counter
        counter={item.quantity}
        max={item.maxNum}
        setCount={setItemCount}
      />
        <Price
          currentPrice={item.currentPrice}
          originalPrice={item.originalPrice}
          originalColor="#6F7882"
          currentColor="#4E2FD2"
          category = {item.category}
          isReview = {true}
          key={item.productId}
        />
      </div>
    </li>
  );
}
