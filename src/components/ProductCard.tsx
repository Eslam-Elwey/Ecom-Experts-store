import { useState } from "react";
import type { ProductType } from "../types/product.type";
import Counter from "./Counter";
import Vraiants from "./Vraiants";
import { calcDiscount } from "../lib/helper";
import { useCart } from "../hooks/useCart";
import Price from "./Price";

export default function ProductCard({ item }: { item: ProductType }) {
  const [selectedVariant, setSelectedVariant] = useState(
    item.defaultVariant ?? "default",
  );

  const { addOrUpdateItem, getItemQuantity } = useCart();

  const counter = getItemQuantity(item.id, selectedVariant);

  const maxCount = item.seedQty[selectedVariant];

  const setItemCount: React.Dispatch<React.SetStateAction<number>> = (
    value,
  ) => {
    const variant = item.variants?.find((v) => v.id === selectedVariant);

    addOrUpdateItem(
      {
        productId: item.id,
        category: item.category,
        variantId: selectedVariant,
        currentPrice: item.currentPrice,
        originalPrice: item.originalPrice,
        image: variant?.image ?? item.image,
        title: item.title,
        maxNum: item.seedQty[selectedVariant],
      },
      value,
    );
  };

  return (
    <li
      className={`${counter !== 0 ? "border-2 border-[#4E2FD2B2]" : ""} relative w-10/12 md:w-[calc(50%-0.5rem)] xl:w-[calc(20%-0.8rem)]
         bg-white flex flex-col md:flex-row lg:flex-col xl:flex-col gap-4.75 justify-center items-center p-2.75 rounded-[10px] xl:px-2.75 xl:py-3.75`}
    >
      {/* discount bedge */}
      {item.originalPrice && item.originalPrice !== item.currentPrice && (
        <span className="text-white bg-primary absolute top-3.25 left-4.25 px-1.5 py-0.5 rounded-full text-[12px] tracking-normal text-center font-semibold ">
          Save {calcDiscount(item.originalPrice, item.currentPrice)}%
        </span>
      )}
      <div className="w-3/4 ">
        <img
          src={item.image ?? `default.png`}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="grow">
        <h3 className="font-semibold text-[16px] tracking-[0.6px] text-[#1F1F1F] ">
          {item.title}
        </h3>
        <p className="font-semibold text-[14px] tracking-[0.6px] text-[#1F1F1FBF] leading-[130%] ">
          {item.description}{" "}
          <a className="text-primary underline" href="#">
            Learn More
          </a>
        </p>

        {/* Vraiants  */}
        {item.variants && item.defaultVariant && (
          <Vraiants
            variants={item.variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            key={item.id}
          />
        )}

        {/* price and count  */}
        <div className="w-full mx-auto flex justify-between items-center mt-2 px-2">
          <Counter counter={counter} max={maxCount} setCount={setItemCount} />

          {/* price  original / current */}
          <Price
            currentPrice={item.currentPrice}
            originalPrice={item.originalPrice}
            key={item.id}
            category={item.category}
          />
        </div>
      </div>
    </li>
  );
}
