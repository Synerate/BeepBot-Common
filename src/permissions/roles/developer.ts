import { Role } from '../role';
import { Owner } from './owner';

export const Developer = new Role({
  id: '0',
  name: 'Developer',
  type: 'internal',
  inherits: [ Owner ],
  permissions: [
    '*',
    'developer:manage'
  ]
});
