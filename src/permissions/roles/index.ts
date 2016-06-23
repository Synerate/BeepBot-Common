import { User } from "./user";
import { Regular } from "./regular";
import { Moderator } from "./moderator";
import { Owner } from "./owner";
import { Developer } from "./developer";
import { Role } from "../role";

export const Roles: Role[] = [
  User,
  Regular,
  Moderator,
  Owner,
  Developer
];
