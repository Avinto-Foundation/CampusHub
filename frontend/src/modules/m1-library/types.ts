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
}

export interface ReserveBookRequest {
  book_id: number;
  studentName: string;
}
