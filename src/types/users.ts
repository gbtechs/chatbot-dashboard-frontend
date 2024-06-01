export type UserRole = "Admin" | "User";

export interface User {
  id: string;
  email: string;
  contact_name: string;
  company_name: string;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
}

export type Users = User[];

export interface UsersData {
  data: Users;
  page: number;
  size: number;
  count: number;
}

export type SessionUser = {
  access_token: string;
  client: {
    contact_name: string;
    company_name: string;
    email: string;
    id: number;
  };
};

export type SessionType = {
  update: any;
  data: {
    expires: string;
    user: SessionUser;
  };
  status: "loading" | "authenticated" | "unathenticated";
};
