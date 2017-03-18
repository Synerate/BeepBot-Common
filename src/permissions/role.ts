import { dropRight, kebabCase, union, } from 'lodash';

export type RoleType = 'internal' | 'custom';

export interface UserRole {
  id: string;
  name: string;
  type: RoleType;
  permissions: string[];
  inherits?: Role[];
  boost?: number;
}

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
    this.slug = kebabCase(name);
    this.type = type;
    this.permissions = permissions;
    // Apply all the permissions from the sub roles to this role.
    inherits.forEach(inherit => this.permissions = union(this.permissions, inherit.permissions));
    this._pointBoost = boost;
  }

  /**
   * Check to see if the role has a given permission.
   */
  has(permission: string): boolean {
    const permissions = this.permissions;
    if (permissions.includes(permission)) {
      return true;
    }
    for (let i = 0, length = permissions.length; i < length; i++) {
      const perm = permissions[i].split(':');
      if (perm.includes('*')) {
        return new RegExp(`(${dropRight(perm, 1).join(':')}.*)`, 'i').test(permission);
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
  set(permissions: string[]): this {
    this.permissions = permissions;
    return this;
  }

  /**
   * Adds a permission to a role.
   */
  add(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  /**
   * Removes a permission from a role.
   */
  remove(permission: string): void {
    this.permissions = this.permissions.filter(perm => perm !== permission);
  }
}
