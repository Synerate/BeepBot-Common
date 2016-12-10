import { Role } from "../role";

export const Owner = new Role({
  name: "Owner",
  type: "internal",
  permissions: [
    "channel:command:forcedelete",
    "channel:command:restore",
    "command:run:owner",
    "bot:command:status"
  ]
});
