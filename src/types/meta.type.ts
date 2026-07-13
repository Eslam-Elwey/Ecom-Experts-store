export interface StepType {
  title: string;
  category: string;
  nextLabel: string;
}

export interface GuaranteeType {
  title: string;
  description: string;
}

export interface MetaType {
  guarantee: GuaranteeType;
  financing: string;
  steps: StepType[];
}
