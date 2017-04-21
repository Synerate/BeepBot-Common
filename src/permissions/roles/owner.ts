import { Role } from '../role';
import { Editor } from './editor';

export const Owner = new Role({
  id: '1',
  name: 'Owner',
  type: 'internal',
  inherits: [ Editor ],
  permissions: [
    'channel:bot:update',
    'channel:command:forceDelete',
    'channel:gif:forceDelete',
    'channel:quote:forceDelete',
    'channel:bot:create',
  ]
});
