import { CheckStatus } from "@lib/services/role/permission.service.type";
import { UserStatus } from "@lib/services/user/user.service.type";

export function hasPermission(
  users,
  permissions,
  adminPortalPermissions,
  user,
  adminMenu,
  permissionType
) {
  if (
    !["viewPermission", "editPermission", "deletePermission"].includes(
      permissionType
    )
  ) {
    throw new Error(
      "Invalid permission type. Must be viewPermission, editPermission, or deletePermission."
    );
  }

  const selectedUser = users?.find((u) => u?.id === user?.id);

  if (!selectedUser) return false;

  if (selectedUser?.userType === UserStatus.ADMIN) return true;

  const userAdminPermissions = adminPortalPermissions?.find(
    (ap) => ap?.userId === user?.id
  );

  if (!userAdminPermissions) return false;

  const userPermissionEntries = permissions?.filter((p) =>
    userAdminPermissions?.permissionId.includes(p?.id)
  );

  const menuPermissions = userPermissionEntries?.filter(
    (p) => p?.menuId === adminMenu?.id
  );

  if (!menuPermissions || menuPermissions.length === 0) return false;

  return menuPermissions.some(
    (menuPermission) => menuPermission[permissionType] === CheckStatus.YES
  );
}
