import { Role } from "../role";
import { Regular } from "./regular";

export const Moderator = new Role({
  name: "Moderator",
  type: "internal",
  inherits: [ Regular ],
  permissions: [
    "channel:command:edit",
    "channel:command:delete",
    "channel:command:create",
    "channel:quote:create",
    "channel:quote:delete",
    "channel:cooldown:bypass",
    "game:start",
    "game:end",
    "protection:manage"
  ]
});
