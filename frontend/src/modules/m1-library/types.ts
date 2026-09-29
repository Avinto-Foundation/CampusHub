export interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  desciption: string;
}

export interface Reservation {
  id: number;
  book_id: number;
  book_title: string;
  student_name: string;
  email: string;
  roll_number: string;
  phone: string;
  loan_days: number;
  pickup_location: string;
  due_date_reminder: boolean;
}

export interface ReserveBookRequest {
  book_id: number;
  studentName: string;
  email: string;
  roll_number: string;
  phone: string;
  loan_days: number;
  pickup_location: string;
  due_date_reminder: boolean;
}
