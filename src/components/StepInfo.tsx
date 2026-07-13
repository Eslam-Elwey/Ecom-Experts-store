import type { ComponentType, SVGProps } from "react";
import type { StepType } from "../types/meta.type";
import DownChevron from "../assets/icons/down-chevron.svg?react";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
type StepItem = StepType & { index: number; icon: SvgIcon };

export default function StepInfo({
  step,
  totalSteps,
}: {
  step: StepItem;
  totalSteps: number;
}) {
  const {  title, icon: Icon, index } = step;
  return (
    <li>
      <p className="text-left px-3.75 text-[#484848] text-[10px] md:text-[12px] font-medium leading-[100%] uppercase tracking-[1.6px] h-2.5 md:h-3 ">
        step {index} of {totalSteps}
      </p>
      {/* wrapper  */}
      <div className="py-5 px-3.75 border-y-[0.5px] border-[#1F1F1F]">
        {/* content  */}
        <div className="flex justify-between">
          {/* icon and title  */}
          <div className="flex  items-center gap-2">
            <Icon className="text-[#6F7882] size-5 md:size-[21.13px] xl:size[24.375px]" />
            <p className="font-semibold text-[18px] md:text-[22px]">{title}</p>
          </div>

          {/* selected item count and chveron  */}
          <div className="flex items-center text-[#4E2FD2] gap-1">
            <span>2 selected</span>
            <DownChevron className="cursor-pointer" />
          </div>
        </div>
      </div>
    </li>
  );
}
