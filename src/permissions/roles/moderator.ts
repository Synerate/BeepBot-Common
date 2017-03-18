import { Role } from '../role';
import { Subscriber } from './subscriber';

export const Moderator = new Role({
  id: '2',
  name: 'Moderator',
  type: 'internal',
  inherits: [ Subscriber ],
  permissions: [
    'channel:alias:create',
    'channel:alias:delete',
    'channel:alias:update',
    'channel:command:create',
    'channel:command:delete',
    'channel:command:update',
    'channel:gif:create',
    'channel:gif:delete',
    'channel:gif:update',
    'channel:protection:manage',
    'channel:quote:create',
    'channel:quote:delete',
    'channel:quote:update',
    'channel:regular:create',
    'channel:regular:delete',
    'channel:restore:update',
    'channel:variable:create',
    'channel:variable:delete',
    'channel:variable:update',
  ]
});
