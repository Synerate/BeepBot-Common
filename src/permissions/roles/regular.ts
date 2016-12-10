import { Role } from "../role";

export const Regular = new Role({
  name: "Regular",
  type: "internal",
  permissions: [
    "protection:bypass",
    "command:run:regular"
  ]
});
