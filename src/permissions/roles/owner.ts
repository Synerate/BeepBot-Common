import { Role } from '../role';
import { Moderator } from './moderator';

export const Owner = new Role({
  id: '1',
  name: 'Owner',
  type: 'internal',
  inherits: [ Moderator ],
  permissions: [
    'channel:bot:update',
    'channel:command:forceDelete',
    'channel:gif:forceDelete',
    'channel:quote:forceDelete',
    'channel:bot:create',
  ]
});
