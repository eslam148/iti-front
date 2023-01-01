export interface IOrder {
  name: string;
  quantity: string;
  category: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

export interface IOrderDetails {
  id?: number;
  user_id: string;
  total: number;
  payment_id: number;
  created_at?: Date;
  modified_at?: Date;
  isDeleted?: Boolean;
  progress: number;
}
export interface OrderItem {
  order_Details_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  modified_at: string;
  isDeleted: boolean;
}
export interface GetOrderItem {
  name: string;
  quantity: number;
  price: number;
  nameAr: string;
}
