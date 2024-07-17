export type InputCreateProduct = {
  name: string;
  description_short: string;
  description_long: string;
  picture: string[];
  price_daily: number;
  price_fixed: number;
  discount: number;
  quantity: number;
  category: number;
};
