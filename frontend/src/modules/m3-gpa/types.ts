export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  descripton: string;
}

export interface GpaRecord {
  id: number;
  student_name: string;
  gpa: string;
}

export interface SaveGpaRequest {
  name: string;
  gpa: number;
}
