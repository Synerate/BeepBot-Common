import { Role } from "../role";
import { Moderator } from "./moderator";

export const Owner = new Role({
  name: "Owner",
  type: "internal",
  inherits: [ Moderator ],
  permissions: [
    "bot:manage",
    "channel:custom:override",
    "channel:command:forcedelete",
    "channel:command:restore",
    "owner:override"
  ]
});
