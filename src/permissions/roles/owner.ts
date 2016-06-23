import { Role } from "../role";
import { Moderator } from "./moderator";

export const Owner = new Role({
  name: "Owner",
  type: "internal",
  inherits: [ Moderator ],
  permissions: [
    "channel:command:forcedelete"
  ]
});
