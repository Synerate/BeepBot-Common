import { Role } from "../role";

export const User = new Role({
  name: "User",
  type: "internal",
  permissions: [
    "user:voice",
    "game:join"
  ]
});
