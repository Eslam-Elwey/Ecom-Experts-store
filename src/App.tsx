import Header from "./components/Header";
import CartContextProvider from "./contexts/CartContextProvider";
import StoreLayout from "./layouts/StoreLayout";

export default function App() {
  return (
    <div className="py-7.75 text-center md:py-12.5 md:w-10/12 md:mx-auto ">
      <Header />
      <CartContextProvider>
        <StoreLayout />
      </CartContextProvider>
    </div>
  );
}
