export interface User {
  id: number;
  pseudo: string;
  firstName: string;
  email: string;
  password: string;
  status: string;
  comments: string;
  createdAt: Date;
  lastActivity: Date;

  logs: any[];
}
