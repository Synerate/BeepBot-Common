import { Role } from "../role";
import { Subscriber } from "./subscriber";

export const Moderator = new Role({
  name: "Moderator",
  type: "internal",
  inherits: [ Subscriber ],
  permissions: [
    "channel:alias:manage",
    "channel:cooldown:bypass",
    "channel:custom:create",
    "channel:custom:delete",
    "channel:custom:edit",
    "channel:gif:create",
    "channel:gif:delete",
    "channel:quote:create",
    "channel:quote:delete",
    "channel:regular:manage",
    "channel:ticker:manage",
    "channel:variable:manage",
    "channel:variables:manage",
    "command:chuck:run",
    "command:hquote:run",
    "command:joke:run",
    "command:points:manage",
    "command:raided:run",
    "command:restore:run",
    "command:synced:run",
    "games:start",
    "games:stop",
    "message:tagging",
    "platform:send:custom",
    "protection:manage",
    "protection:permit",
    "role:fallback"
  ]
});
