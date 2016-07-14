import * as _ from "lodash";

export class Role {
  /**
   * The name of the role.
   */
  name: string;
  /**
   * The type of the role.
   */
  type: RoleType;
  /**
   * The permissions which the role has access too.
   */
  public permissions: string[];
  /**
   * The roles which this role inherits.
   */
  _inherits: Role[];

  constructor({ name, type, permissions, inherits }: UserRole) {
    this.name = name;
    this.type = type;
    this.permissions = permissions;
    this._inherits = inherits || [];
    this._inherits.forEach(inherit => {
      this.permissions = _.union(this.permissions, inherit.permissions)
    });
  }

  /**
   * Check to see if the role has a given permission.
   */
  has(permission: string): boolean {
    // TODO: Handle wild cards better.
    return this.permissions.indexOf("*") != -1 ? true : this.permissions.indexOf(permission) !== -1;
  }

  /**
   * Check to see if the role inherits another role.
   */
  inherits(name: string): boolean {
    if (this.name === name) {
      return true;
    }
    for (let i = 0, length = this._inherits.length; i < length; i++) {
      if (this._inherits[i].inherits(name)) {
        return true;
      }
    }
    return false;
  }
}

export type RoleType = "internal" | "custom";

export interface UserRole {
  name: string;
  type: RoleType;
  permissions: string[];
  inherits?: Role[];
}
