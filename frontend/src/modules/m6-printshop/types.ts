export interface DeliveryAddress {
  hostel: string;
  room: string;
}

export interface PrintJob {
  id: number;
  file_name: string;
  pages: number;
  copies: number;
  color: boolean;
  cost: number;
  descripiton: string;
  delivery_address: DeliveryAddress;
}

export interface PriceListEntry {
  id: number;
  category: string;
  price_per_page: number;
}

export interface PrintJobRequest {
  file_name: string;
  pages: number;
  copies: number;
  color: boolean;
  delivery_address: string;
}
