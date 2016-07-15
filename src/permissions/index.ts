import { Role } from "./role";
import { Roles } from "./roles";
import { Descriptions } from "./descriptions";

export class Permissions {
  private roles: UserRoles = {};

  constructor() {
    Roles.forEach(role => this.registerRole(role));
  }

  /**
   * Register a user role.
   */
  public registerRole(role: Role): void {
    if (this.roles[role.name] != null) {
      throw new Error("Role already registered");
    }
    this.roles[role.name] = role;
  }

  /**
   * Get a user role.
   */
  public get(role: string): Role {
    return this.roles[role];
  }

  /**
   * Get all the user roles registered.
   */
  public getRoles(): UserRoles {
    return this.roles;
  }

  /**
   * Get the description for the permission from it's name.
   */
  public static describe(permission: string): string {
    return Descriptions[permission] ? Descriptions[permission].text : null;
  }
}

export interface UserRoles {
  [role: string]: Role;
}