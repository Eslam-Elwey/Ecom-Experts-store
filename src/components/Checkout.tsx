
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const { savings, setIsSaved } = useCart();

  return (
    <div className=" ">
      <p className="text-[#0AA288] text-[12px] xl:text-[14px] tracking-[-0.06px] text-center">
        Congrats! You’re saving ${savings} on your security bundle!
      </p>
      <button className="w-full text-[17px] font-semibold bg-primary text-white py-3.25 px-4 rounded-sm">
        Checkout
      </button>
      <button
        onClick={() => setIsSaved(() => true)}
        className="font-normal text-[#484848] text-[14px] underline w-full cursor-pointer"
      >
        Save my system for later
      </button>
    </div>
  );
}
