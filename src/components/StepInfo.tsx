import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import type { StepType } from "../types/meta.type";
import DownChevron from "../assets/icons/down-chevron.svg?react";
import UpChevron from "../assets/icons/up-chevron.svg?react";
import Products from "./Products";
import { getCategoryProdcuts } from "../services/apiProducts";
import type { ProductType } from "../types/product.type";
import { useCart } from "../hooks/useCart";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
type StepItem = StepType & { index: number; icon: SvgIcon };

export default function StepInfo({
  step,
  totalSteps,
  openName,
  setOpenName,
}: {
  step: StepItem;
  totalSteps: number;
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { title, icon: Icon, index, nextLabel, category, nextName } = step;
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const isOpen = category === openName;

  const { items } = useCart();

  const selectedItems = items
    .filter((item) => item.category === category)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  useEffect(() => {
    if (!isOpen || products) return;
    async function getProducts() {
      try {
        setIsLoading(() => true);
        const data = await getCategoryProdcuts(category);
        setProducts(() => data);
      } catch (err) {
        setError(() => `Failed to fetch ${category} data...`);
        console.error(err);
      } finally {
        setIsLoading(() => false);
      }
    }

    getProducts();
  }, [isOpen, category, products]);

  if (isLoading)
    return (
      <p className="text-2xl h-96 flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p className="text-red-500 text-[16px] my-4">{error}</p>;

  return (
    <li
      className={`${isOpen ? "bg-[#EDF4FF] rounded-[10px] pt-3.75" : ""} mb-2 last:mb-0 md:mb-2`}
    >
      <p className="text-left px-3.75 text-[#484848] text-[10px] md:text-[12px] font-medium leading-[100%] uppercase tracking-[1.6px] h-2.5 md:h-3 my-3.75 ">
        step {index} of {totalSteps}
      </p>
      {/* wrapper  */}
      <div
        className={`py-5 px-3.75 border-t-[0.5px] ${!isOpen ? "border-b-[0.5px]" : ""} border-[#1F1F1F]`}
      >
        {/* header  */}
        <div className="flex justify-between mb-3.75">
          {/* icon and title  */}
          <div className="flex  items-center gap-2">
            <Icon className="text-[#6F7882] size-5 md:size-[21.13px] xl:size[24.375px]" />
            <p className="font-semibold text-[18px] lg:text-[22px] xl:text-[28px]">{title}</p>
          </div>

          {/* selected item count and chveron  */}
          <div className="flex items-center text-[#4E2FD2] gap-1 text-[14px]">
            {selectedItems ? <span>{selectedItems} selected</span> : null}
            <span
              onClick={() =>
                setOpenName((prev) => (prev === category ? "" : category))
              }
            >
              {!isOpen ? (
                <DownChevron className="cursor-pointer" />
              ) : (
                <UpChevron className="cursor-pointer" />
              )}
            </span>
          </div>

          {/* content  */}
        </div>
        {isOpen && products && <Products products={products} key={index} />}
        {isOpen && nextLabel && (
          <button
            onClick={() => setOpenName(() => nextName)}
            className="cursor-pointer my-2.5 py-1.25 px-6 rounded-[7px] border border-primary text-primary font-semibold text-[18px] leading-6 tracking-normal"
          >
            Next: Choose {nextLabel}
          </button>
        )}
      </div>
    </li>
  );
}
