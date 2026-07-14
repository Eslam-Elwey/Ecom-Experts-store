import { useState } from "react";
import type { ProductType } from "../types/product.type";
import Counter from "./Counter";
import Vraiants from "./Vraiants";
import { calcDiscount } from "../lib/helper";

export default function ProductCard({ item }: { item: ProductType }) {
  const [selectedVariant, setSelectedVariant] = useState(
    item.defaultVariant ?? "default",
  );

  const [counts, setCounts] = useState<Record<string, number>>(() => {
    return Object.keys(item.seedQty).reduce(
      (acc, key) => {
        acc[key] = 0; //will be stored value come from context
        return acc;
      },
      {} as Record<string, number>,
    );
  });

  const counter = counts[selectedVariant];

  const maxCount = item.seedQty[selectedVariant];

  const setItemCount: React.Dispatch<React.SetStateAction<number>> = (
    value,
  ) => {
    setCounts((prev) => {
      const current = prev[selectedVariant];
      const next = typeof value === "function" ? value(current) : value;
      return {
        ...prev,
        [selectedVariant]: next,
      };
    });
  };

  return (
    // todo: add border 2px color#4E2FD2B2 if this item is selected
    <li
      className={`w-10/12 md:w-[calc(50%-0.5rem)] xl:w-[calc(20%-0.8rem)] bg-white flex flex-col md:flex-row xl:flex-col gap-4.75 justify-center items-center p-2.75 rounded-[10px] xl:px-2.75 xl:py-3.75`}
    >
      <div className="w-full grow relative">
        <img
          src={item.image ?? `default.png`}
          alt={item.title}
          className="w-full h-50 md:h-37.75 xl:h-50 object-contain"
        />
        {/* discount bedge */}
        {item.originalPrice && item.originalPrice !== item.currentPrice && (
          <span className="text-white bg-primary absolute top-[-0.05%] -left-1.25 px-1.5 py-0.5 rounded-full text-[12px] tracking-normal text-center font-semibold ">
            Save {calcDiscount(item.originalPrice, item.currentPrice)}%
          </span>
        )}
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
            <span className="text-[#575757]">${item.currentPrice}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
