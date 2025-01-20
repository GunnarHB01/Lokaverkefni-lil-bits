export type Provision = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  price: number;
  category: string;
};

export type Dish = {
  id: string;
  category: string;
  cousine: string;
  description: string;
  imageSource: string;
  name: string;
  price: number;
};

export type Drink = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  price: number;
  category: string;
  brewer: string;
  quantity?: number;
};

export type TempOrder = {
  id: number;
  email: string;
  food: Dish[];
  drinks: Drink[];
  count: number;
  date: Date;
  totalPrice?: number;
};

export type Order = {
  id: number;
  email: string;
  food: Dish[];
  drinks: Drink[];
  count: number;
  date: Date;
  totalPrice: number;
};