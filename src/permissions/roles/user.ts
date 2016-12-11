import { Role } from "../role";

export const User = new Role({
  name: "User",
  type: "internal",
  permissions: [
    "game:join",
    "user:voice"
  ]
});
