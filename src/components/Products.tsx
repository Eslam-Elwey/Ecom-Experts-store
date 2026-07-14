import type { ProductType } from "../types/product.type";
import ProductCard from "./ProductCard";

export default function Products({ products }: { products: ProductType[] }) {
  return (
    <ul className="flex flex-wrap gap-3.75 justify-center ">
      {products.map((product) => (
        <ProductCard item={product} key={product.id} />
      ))}
    </ul>
  );
}
