import type { CartItemType } from "../types/cartItem.type";
import ReviewItem from "./ReviewItem";

type Props = {
    title: string;
    items: CartItemType[];
};

export default function ReviewSection({
    title,
    items,
}: Props) {

    if (!items.length) return null;

    return (

        <section className="mb-6 border-t border-[#CED6DE]">

            <h3 className="mt-3.75 mb-2 text-xs uppercase text-gray-400">

                {title}

            </h3>

            <ul className="space-y-2">

                {items.map(item => (

                    <ReviewItem
                        key={`${item.productId}-${item.variantId}`}
                        item={item}
                    />

                ))}

            </ul>

        </section>

    );
}