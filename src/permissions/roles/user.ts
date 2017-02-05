import { Role } from '../role';

export const User = new Role({
  id: "5",
  name: 'User',
  type: 'internal',
  permissions: [
    'game:join',
    'user:voice'
  ]
});
