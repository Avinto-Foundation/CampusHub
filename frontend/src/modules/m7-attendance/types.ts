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
  date: string;
  reason: string;
}

export interface LeaveRequestBody {
  name: string;
  leave_date: string;
  reason: string;
}
