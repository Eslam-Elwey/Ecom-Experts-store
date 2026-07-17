import Checkout from "./Checkout";
import Gurantee from "./Gurantee";
import ReviewCart from "./ReviewCart";
import Shipping from "./Shipping";

export default function Review() {
  return (
    <div className="bg-[#EDF4FF] h-fit pt-3.75 text-left md:rounded-[10px]">
      <header className="px-3.75 xl:hidden">
        <h4 className="uppercase text-[#484848] text-[12px] tracking-[1.6px]">
          review
        </h4>
      </header>

      {/*content  and items and shipping */}
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-13 px-5 pt-5 pb-7.75 xl:justify-between">
        <section className="">
          <div className="mb-2.5">
            <h5 className="text-[#1F1F1F] text-[22px] xl:text-[28px] font-semibold tracking-[0.6px]">
              Your security system
            </h5>
            <p className="text-[12px] md:text-[14px] xl:text-[16px] tracking-[0.6px] leading-[130%]">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>
          <ReviewCart />
          <Shipping />
        </section>

        {/* gurantee and  checkout  */}
        <section>
            <Gurantee />
            <Checkout />
        </section>
      </div>
    </div>
  );
}
