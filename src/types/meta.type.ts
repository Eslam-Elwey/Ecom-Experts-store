export interface StepType {
  title: string;
  category: string;
  nextLabel: string;
  nextName: string;
}

export interface GuaranteeType {
  title: string;
  description: string;
  image: string;
}
export interface shippingType {
  label: string;
  originalPrice: number;
  currentPrice: number;
  priceLabel: string;
}

export interface MetaType {
  guarantee: GuaranteeType;
  financing: string;
  steps: StepType[];
  shipping: shippingType;
}
