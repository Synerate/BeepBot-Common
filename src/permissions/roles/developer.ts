import { Role } from "../role";

export const Developer = new Role({
  name: "Developer",
  type: "internal",
  permissions: [
    "*"
  ]
});
