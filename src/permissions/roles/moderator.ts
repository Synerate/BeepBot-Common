import { Role } from "../role";

export const Moderator = new Role({
  name: "Moderator",
  type: "internal",
  permissions: [
    "channel:command:edit",
    "channel:command:delete",
    "channel:command:create",
    "channel:quote:create",
    "channel:quote:delete",
    "channel:cooldown:bypass",
    "channel:regulars:manage",
    "channel:ticker:manage",
    "channel:variables:manage",
    "game:start",
    "game:end",
    "protection:manage",
    "command:run:moderator",
    "platform:send:custom"
  ]
});
