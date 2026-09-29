export interface Subject {
  id: number;
  subject: string;
  attended: number;
  total: number;
  desription: string;
}

export interface LeaveRequest {
  id: number;
  name: string;
  roll_number: string;
  email: string;
  subject: string;
  leave_type: string;
  date: string;
  days: number;
  reason: string;
  informed_teacher: boolean;
}

export interface LeaveRequestBody {
  name: string;
  roll_number: string;
  email: string;
  subject: string;
  leave_type: string;
  leave_date: string;
  days: number;
  reason: string;
  informed_teacher: boolean;
}
