import { User, UserRoleType } from "entities";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<{ user: User | null }, UserRoleType> = (
  { context },
  roles
): boolean => {
  if (!context.user) {
    return false;
  }

  if (roles.length === 0) {
    return true;
  }

  return roles.includes(context.user.role);
};
