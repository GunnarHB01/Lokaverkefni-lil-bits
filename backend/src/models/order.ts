export type Order = {
    id: number;
    email: string;
    dish: {
      id: string;
      name: string;
      description: string;
      imageSource: string;
      price: number;
      category: string;
      cousine: string;
    };
    drinks: {
      id: string;
      name: string;
      description: string;
      imageSource: string;
      price: number;
      category: string;
      brewer: string;
    }[];
    count: number;
    date: Date;
  };
  