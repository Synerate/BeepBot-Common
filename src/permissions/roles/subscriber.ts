import { Role } from "../role";
import { User } from "./user";

export const Subscriber = new Role({
  name: "Subscriber",
  type: "internal",
  inherits: [ User ],
  permissions: [
    "command:run:subscriber"
  ]
});
