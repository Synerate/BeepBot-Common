import * as _ from "lodash";

export class Role {
  /**
   * The name of the role.
   */
  public name: string;
  /**
   * The slug name of the role.
   */
  public slug: string;
  /**
   * The type of the role.
   */
  public type: RoleType;
  /**
   * The permissions which the role has access too.
   */
  public permissions: string[];
  /**
   * The XP boost which the role gives to users.
   */
  private _pointBoost: number;

  constructor({ name, type, permissions, boost = 0 }: UserRole) {
    this.name = name;
    this.slug = _.kebabCase(name);
    this.type = type;
    this.permissions = permissions;
    this._pointBoost = boost;
  }

  /**
   * Check to see if the role has a given permission.
   */
  has(permission: string): boolean {
    const permissions = this.permissions;
    if (permissions.indexOf(permission) > -1) {
      return true;
    }
    for (let i = 0, length = permissions.length; i < length; i++) {
      const perm = permissions[i].split(":");
      if (perm.indexOf("*") > -1) {
        return new RegExp(`(${_.dropRight(perm, 1).join(":")}.*)`, "i").test(permission);
      }
    }
    return false;
  }

  /**
   * Get the XP boost for the user role.
   */
  getBoost(): number {
    return this._pointBoost;
  }
}

export type RoleType = "internal" | "custom";

export interface UserRole {
  name: string;
  type: RoleType;
  permissions: string[];
  boost?: number;
}
