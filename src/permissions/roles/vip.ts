import { Role } from '../role';
import { Regular } from './regular';

export const VIP = new Role({
  id: '4',
  name: 'vip',
  type: 'internal',
  inherits: [ Regular ],
  permissions: []
});
