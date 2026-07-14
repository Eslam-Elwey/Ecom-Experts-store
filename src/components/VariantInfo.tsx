import type { ProductVariant } from "../types/product.type";

export default function VariantInfo({
  item,
  selectedVariant,
  setSelectedVariant,
}: {
  item: ProductVariant;
  selectedVariant: string;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isSelected = selectedVariant === item.id;
  return (
    <button
    onClick={()=>setSelectedVariant(()=>item.id)}
      className={`${isSelected ? "bg-[#1DF0BB0A]" : ""} border-[0.5px] border-[#0AA288] py-px px-0.75 rounded-xs flex justify-center items-center cursor-pointer`}
    >
      <img src={item.image} alt={item.label} className="w-1/2 h-5.5 object-cover" />
      <span className="text-[#1F1F1F] text-[10px] font-medium tracking-[0.6px]">
        {item.label}
      </span>
    </button>
  );
}
