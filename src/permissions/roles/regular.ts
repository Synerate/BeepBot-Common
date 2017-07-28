import { Role } from '../role';
import { User } from './user';

export const Regular = new Role({
  id: '5',
  name: 'Regular',
  type: 'internal',
  inherits: [ User ],
  permissions: [
    'channel:protection:bypass',
    'channel:commands:view',
  ]
});
