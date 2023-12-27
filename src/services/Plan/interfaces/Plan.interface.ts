export interface Plan {
  id: string;
  name: string;
  description: string;
  monthly_price: string;
  stripe_product_id: string;
  simulations_per_month: string;
}

export interface PlanResponse {
  count: number;
  results: Plan[];
}
