export interface Event {
  id: number;
  title: string;
  date: string;
  capacity: number;
  registered_count: number;
  discription: string;
}

export interface Announcement {
  id: number;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  roll_number: string;
  tshirt_size: string;
  emergency_contact: string;
}
