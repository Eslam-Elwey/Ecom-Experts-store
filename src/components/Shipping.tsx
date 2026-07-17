import DeliveryIcon from "../assets/icons/delivery.svg?react";
import { useCart } from "../hooks/useCart";

export default function Shipping() {
  const { meta } = useCart();
  return (
    <div className="flex justify-between items-center border-t border-[#CED6DE] pt-3.75 mb-2.5">
      <div className="flex justify-center items-center gap-3">
        <span className="p-1.5 bg-white w-fit block">
          <DeliveryIcon className="text-[#0AA288] w-[22.67px] h-[19.94px]" />
        </span>
        <h4 className="text-[#0B0D10] text-12px md:text-[14px] xl:text-[18px] leading-4 tracking-[0.5%]">
          {meta?.shipping.label}
        </h4>
      </div>
      {/* price of shipping */}
      <p className="flex xl:flex-row xl:gap-2.5">
        <span className="text-[#6F7882] font-medium  text-12px md:text-[14px] xl:text-[16px] line-through">
          ${meta?.shipping.originalPrice}
        </span>
        <span className="text-primary font-semibold  text-12px md:text-[14px] xl:text-[16px]">
          ${meta?.shipping.priceLabel}
        </span>
      </p>
    </div>
  );
}
