import { Role } from "../role";
import { User } from "./user";

export const Regular = new Role({
  name: "Regular",
  type: "internal",
  inherits: [ User ],
  permissions: [
    "protection:bypass"
  ]
});
