import { Role } from "../role";
import { Regular } from "./regular";

export const Subscriber = new Role({
  name: "Subscriber",
  type: "internal",
  inherits: [ Regular ],
  permissions: []
});
