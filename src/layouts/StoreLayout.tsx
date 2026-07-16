import Review from "../components/Review";
import Steps from "../components/Steps";

export default function StoreLayout() {
  return (
    <div className="w-full mx-auto flex flex-col md:flex-row xl:flex-col md:gap-5 ">
      {/* steps section  */}
      <div className="flex-1">
        <Steps />
      </div>
      {/* review section */}
      <div className="md:w-85 md:shrink-0 xl:w-full">
        <Review  />
      </div>
    </div>
  );
}
