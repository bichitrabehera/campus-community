// Role constants for frontend
export const ADMIN_ROLES = ["admin", "hod", "club_leader"] as const;
export const USER_ROLES = ["student", "alumni", "faculty"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
export type UserRole = (typeof USER_ROLES)[number];
export type UserRoleType = AdminRole | UserRole;

// Check if user has admin role
export const isAdmin = (role: string): boolean => {
  return ADMIN_ROLES.includes(role as AdminRole);
};

// Check if user has specific role
export const hasRole = (
  userRole: string,
  requiredRole: UserRoleType
): boolean => {
  return userRole === requiredRole;
};

// Check if user has any of the required roles
export const hasAnyRole = (
  userRole: string,
  requiredRoles: UserRoleType[]
): boolean => {
  return requiredRoles.includes(userRole as UserRoleType);
};
