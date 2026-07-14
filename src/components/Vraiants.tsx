import type { ProductVariant } from "../types/product.type";
import VariantInfo from "./VariantInfo";

export default function Vraiants({
  variants,
  selectedVariant,
  setSelectedVariant,
}: {
  variants: ProductVariant[];
  selectedVariant: string;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <ul className="flex gap-8 items-center justify-center my-1.5 flex-wrap">
      {variants.map((variant) => (
        <VariantInfo
          item={variant}
          key={variant.id}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      ))}
    </ul>
  );
}
