export default function Price({
  originalPrice,
  currentPrice,
  originalColor,
  currentColor,
  category,
  isReview
}: {
  originalPrice: number | null;
  originalColor?: string;
  currentPrice: number;
  currentColor?: string;
  category?:string
  isReview?:boolean
}) {
  return (
    <p className={`text-[16px] tracking-[0.6px] gap-0.75 ${isReview?'flex flex-col xl:flex-row' :'flex flex-row md:flex-col xl:flex-row'}`}>
      {originalPrice && (
        <span
          className="line-through"
          style={{ color: originalColor ?? "#D8392B" }}
        >
          ${originalPrice}
          {category === 'Plans' && '/mo'} 
        </span>
      )}
      <span style={{ color: currentColor ?? "#575757" }}>
        {currentPrice !== 0 && '$'}
        {currentPrice !== 0 ? `${currentPrice}` : "free"}
        {category === 'Plans' && '/mo'} 
      </span>
    </p>
  );
}
