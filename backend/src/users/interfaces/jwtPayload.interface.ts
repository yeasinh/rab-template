import { AdminMenu } from 'src/configuration/models/admin-menu.model';
import { Permission } from 'src/configuration/models/permission.model';
import { UserType } from 'src/prisma/user-type.enum';

export class JwtPayload {
  id: number;
  userType: keyof typeof UserType;
  permissionId?: number[];
  permissions?: Permission[];
  menus?: AdminMenu[];
}
