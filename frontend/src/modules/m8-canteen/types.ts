export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  descrption: string;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface Order {
  id: number;
  name: string;
  phone: string;
  pickup_time: string;
}

export interface OrderItemBody {
  menu_item_id: number;
  qty: number;
}

export interface OrderRequest {
  name: string;
  phone: string;
  pickupTime: string;
  notes: string;
  delivery_address: string;
  items: OrderItemBody[];
}
