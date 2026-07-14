import type { ProductType } from "../types/product.type";

export async function getCategoryProdcuts(
  category: string,
): Promise<ProductType[]> {

  let endPoint = category.toLowerCase();
  
  if (endPoint === "accessories") {
    endPoint = "protections";
  }
  console.log(endPoint);

  try {
    const response = await fetch(`/api/${endPoint}`);
    if (!response.ok) {
      throw new Error(`error in fetching ${endPoint} data`);
    }
    const data = await response.json();
    if(category==='plans') {
        return data.items ;
    }
    return data;
  } catch (err) {
    console.log("error in products service");
    throw err;
  }
}
