import { useState } from "react";
import type { ProductType } from "../types/product.type";
import Counter from "./Counter";
import Vraiants from "./Vraiants";
import { calcDiscount } from "../lib/helper";
import { useCart } from "../hooks/useCart";

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
    const current = getItemQuantity(item.id, selectedVariant);

    const next = typeof value === "function" ? value(current) : value;

    const variantIndex =
      item.variants?.findIndex((variant) => variant.id === selectedVariant) ??
      -1;

    addOrUpdateItem({
      productId: item.id,
      category: item.category,
      variantId: selectedVariant,
      quantity: next,
      currentPrice: item.currentPrice,
      originalPrice: item.originalPrice,
      image:
        variantIndex === -1 ? item.image : item.variants?.[variantIndex].image,
      title: item.title,
    });
  };

  return (
    <li
      className={`${counter !== 0 ? "border-2 border-[#4E2FD2B2]" : ""} relative w-10/12 md:w-[calc(50%-0.5rem)] xl:w-[calc(20%-0.8rem)]
         bg-white flex flex-col md:flex-row xl:flex-col gap-4.75 justify-center items-center p-2.75 rounded-[10px] xl:px-2.75 xl:py-3.75`}
    >
      {/* discount bedge */}
      {item.originalPrice && item.originalPrice !== item.currentPrice && (
        <span className="text-white bg-primary absolute top-[3%] left-1.25 px-1.5 py-0.5 rounded-full text-[12px] tracking-normal text-center font-semibold ">
          Save {calcDiscount(item.originalPrice, item.currentPrice)}%
        </span>
      )}
      <div className="w-full grow ">
        <img
          src={item.image ?? `default.png`}
          alt={item.title}
          className="w-full h-[150px] object-contain"
        />
      </div>

      <div>
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
          <p className="text-[16px] tracking-[0.6px] gap-0.75 flex flex-row md:flex-col xl:flex-row">
            {item.originalPrice && (
              <span className="text-[#D8392B] line-through">
                ${item.originalPrice}
              </span>
            )}
            <span className="text-[#575757]">
              {item.currentPrice !== 0 ? `${item.currentPrice}` : "free"}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}
