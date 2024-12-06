import { Permission } from "./permission.model";
import { Role } from "./role.model";

export class RolePermission {

  id?: number;
  role_id?: number;
  role?: Role;
  permission_id?: number;
  permission?: Permission;
  active?: boolean;

}
