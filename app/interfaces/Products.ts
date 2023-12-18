export interface IApiProduct {
  id: string;
  title: string;
  price: {
    amount: number;
    decimals: number;
  };
  installments: {
    quantity: number;
    amount: string;
    currency_id: string;
  };
  address: {
    state_name: string;
    city_name: string;
  };
  thumbnail: string;
  condition: string;
  shipping: { free_shipping: boolean };
}

export interface IProduct {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: string;
    decimals: number;
  };
  installments: {
    quantity: number;
    amount: string;
  };
  address: {
    state_name: string;
    city_name: string;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}
