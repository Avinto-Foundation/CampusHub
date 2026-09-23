export interface Location {
  block: string;
  room: string;
}

export interface Complaint {
  id: number;
  name: string;
  category: string;
  descrption: string;
  status: string;
  location: Location;
}

export interface Notice {
  id: number;
  message: string;
}

export interface ComplaintRequest {
  name: string;
  category: string;
  description: string;
  location: string;
}
