import { Role } from '../role';

export const User = new Role({
  id: '6',
  name: 'User',
  type: 'internal',
  permissions: [
    'channel:game:join'
  ]
});
