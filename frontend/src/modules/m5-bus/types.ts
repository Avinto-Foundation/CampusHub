export interface Route {
  id: number;
  route_name: string;
  departures: string[];
  descriptoin: string;
}

export interface Announcement {
  id: number;
  message: string;
}

export interface ReminderRequest {
  route_id: number;
  departure: string;
  student_name: string;
  email: string;
  phone: string;
  minutes_before: number;
  channel: string;
  repeat_weekdays: boolean;
}
