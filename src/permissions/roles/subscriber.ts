import { Role } from "../role";

export const Subscriber = new Role({
  name: "Subscriber",
  type: "internal",
  permissions: [
    "command:run:subscriber"
  ]
});
