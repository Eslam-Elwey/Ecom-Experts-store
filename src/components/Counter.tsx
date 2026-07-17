import Minus from "../assets/icons/minus.svg?react";
import Plus from "../assets/icons/plus.svg?react";

export default function Counter({
  counter,
  max,
  setCount,
}: {
  counter: number;
  max: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex gap-2.5 justify-center items-center py-2.5 font-medium">
      <button
        onClick={() => setCount((val: number) => val - 1)}
        disabled={counter === 0}
        className={`size-5 rounded-sm border-2 ${counter === 0 ? "border-[#E6EBF0] bg-[#FFFFFF]" : "border-[#F0F4F7] bg-[#F0F4F7]"}  flex items-center justify-center cursor-pointer`}
      >
        <Minus
          className={`${counter !== 0 ? "text-[#525963]" : "text-[#CED6DE]"} size-2`}
        />
      </button>
      <span className="font-medium text-[16px] leading-5 tracking-normal text-[#0B0D10]">
        {counter}
      </span>
      <button
        onClick={() => setCount((val: number) => val + 1)}
        disabled={counter === max}
        className={`size-5 rounded-sm border-2 ${counter === max ? "border-[#E6EBF0] bg-[#FFFFFF]" : "border-[#F0F4F7] bg-[#F0F4F7]"} flex items-center justify-center cursor-pointer`}
      >
        <Plus
          className={` ${counter !== max ? "text-[#525963]" : "text-[#CED6DE]"} size-2`}
        />
      </button>
    </div>
  );
}
