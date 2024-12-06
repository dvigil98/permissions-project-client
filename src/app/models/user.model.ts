import { Role } from "./role.model";

export class User {

  id?: number;
  role_id?: number;
  role?: Role;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;

}
