import { useCart } from "../hooks/useCart";

export default function Gurantee() {
  const { meta, subtotalBefore, subtotalAfter } = useCart();
  return (
    <div className="flex justify-between  xl:flex-col">
      <div className="flex gap-6.25 justify-center items-center">
        <img
          src={meta?.guarantee.image}
          alt="satisfication bedge"
          className="size-19.5 xl:size-32.75"
        />
        <p className="hidden text-[#1F1F1F] text-[18px] leading-[110%] tracking-[0.6px] xl:flex flex-col gap-5">
          <span className="font-semibold">30-day hassle-free returns</span>
          <span>
            If you're not totally in love with the product, we will refund you
            100%
          </span>
        </p>
      </div>

      {/* finance and pricing before and after */}
      <div className="flex flex-col xl:flex-row xl:justify-between my-2">
        <span className="text-white bg-primary w-fit ml-auto xl:ml-0 py-1.25 px-2 rounded-[3px] text-[12px] xl:text-[16px] tracking-[-5%]">
          {meta?.financing}
        </span>
        <div className="gap-2">
          {/* befor discount */}
          {subtotalBefore !== 0 && (
            <span className="line-through text-[18px] xl:[text-22px] text-[#6F7882] leading-5 font-medium tracking-[0.25%]">
              ${subtotalBefore}
            </span>
          )}
          {/* after discount */}
          {subtotalAfter !== 0 && (
            <span className="text-[24px] xl:[text-28px] text-primary leading-8 font-bold tracking-[0.13%]">
              ${subtotalAfter}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
