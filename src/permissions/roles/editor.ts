import { Role } from '../role';
import { Moderator } from './moderator';

export const Editor = new Role({
  id: '2',
  name: 'Editor',
  type: 'internal',
  inherits: [ Moderator ],
  permissions: [
    'channel:channel:update',
    'channel:command:forceDelete',
    'channel:gif:forceDelete',
    'channel:restore:update',
    'channel:quote:forceDelete'
  ]
});
