import { Role } from './role';
import { Roles } from './roles';
import { Descriptions } from './descriptions';

export interface UserRoles {
  [role: string]: Role;
}

export class Permissions {
  private roles: UserRoles = {};

  constructor() {
    Roles.forEach(role => this.registerRole(role));
  }

  /**
   * Register a user role.
   */
  public registerRole(role: Role): void {
    if (this.roles[role.getName()] != null) {
      throw new Error('Role already registered');
    }
    this.roles[role.getName()] = role;
  }

  /**
   * Unregister a user role.
   */
  public unregisterRole(role: Role): void {
    if (this.roles[role.getName()] == null) {
      throw new Error('Role not found');
    }
    delete this.roles[role.getName()];
  }

  /**
   * Get a user role.
   */
  public get(role: string): Role {
    return this.roles[role];
  }

  /**
   * Gets a user role by the Id.
   */
  public getById(id: string): Role {
    const keys = Object.keys(this.roles);
    for (let i = 0, length = keys.length; i < length; i++) {
      if (this.roles[keys[i]].getId() === id) {
        return this.roles[keys[i]];
      }
    }
    return null;
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
