import * as _ from 'lodash';

export class Role {
  /**
   * The Id of the role.
   */
  private id: string;
  /**
   * The name of the role.
   */
  private name: string;
  /**
   * The slug name of the role.
   */
  private slug: string;
  /**
   * The type of the role.
   */
  private type: RoleType;
  /**
   * The permissions which the role has access too.
   */
  private permissions: string[];
  /**
   * The XP boost which the role gives to users.
   */
  private _pointBoost: number;

  constructor({ id, name, type, permissions, inherits = [], boost = 0 }: UserRole) {
    this.id = id;
    this.name = name;
    this.slug = _.kebabCase(name);
    this.type = type;
    this.permissions = permissions;
    // Apply all the permissions from the sub roles to this role.
    inherits.forEach(inherit => this.permissions = _.union(this.permissions, inherit.permissions));
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
      const perm = permissions[i].split(':');
      if (perm.indexOf('*') > -1) {
        return new RegExp(`(${_.dropRight(perm, 1).join(':')}.*)`, 'i').test(permission);
      }
    }
    return false;
  }

  /**
   * Get the Id of the role.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Get the name of the role.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the slug name for the role.
   */
  getSlug(): string {
    return this.slug;
  }

  /**
   * Get the XP boost for the user role.
   */
  getBoost(): number {
    return this._pointBoost;
  }

  /**
   * Get the permission for the role.
   */
  getPerms(): string[] {
    return this.permissions;
  }

  /**
   * Sets the XP boost for the user role.
   */
  setBoost(boost: number): number {
    this._pointBoost = boost;
    return this._pointBoost;
  }

  /**
   * Overrides the current permissions with new ones.
   */
  set(permissions: string[]): Role {
    this.permissions = permissions;
    return this;
  }

  /**
   * Adds a permission to a role.
   */
  add(permission: string): boolean {
    if (this.permissions.indexOf(permission) === -1) {
      this.permissions.push(permission);
      return true;
    }
    return false;
  }

  /**
   * Removes a permission from a role.
   */
  remove(permission: string): boolean {
    for (let i = 0, length = this.permissions.length; i < length; i++) {
      if (this.permissions[i] === permission) {
        this.permissions.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

export type RoleType = 'internal' | 'custom';

export interface UserRole {
  id: string;
  name: string;
  type: RoleType;
  permissions: string[];
  inherits?: Role[];
  boost?: number;
}
