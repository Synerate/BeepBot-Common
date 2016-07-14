import { Role } from "../role";
import { Owner } from "./owner";

export const Developer = new Role({
  name: "Developer",
  type: "internal",
  inherits: [ Owner ],
  permissions: [
    "*"
  ]
});
