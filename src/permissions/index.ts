import { Role } from "./role";
import { Roles } from "./roles";
import { Descriptions } from "./descriptions";

export class Permissions {
  roles: UserRoles = {};

  constructor() {
    Roles.forEach(role => this.registerRole(role));
  }

  /**
   * Register a user role.
   */
  registerRole(role: Role): void {
    this.roles[role.name] = role;
  }

  /**
   * Get a user role.
   */
  get(role: string): Role {
    return this.roles[role];
  }

  /**
   * Get the description for the permission from it's name.
   */
  static describe(permission: string): string {
    return Descriptions[permission] ? Descriptions[permission].text : null;
  }
}

export interface UserRoles {
  [role: string]: Role;
}