import { Role } from '../role';
import { Subscriber } from './subscriber';

export const Moderator = new Role({
  id: '3',
  name: 'Moderator',
  type: 'internal',
  inherits: [ Subscriber ],
  permissions: [
    'channel:alias:create',
    'channel:alias:delete',
    'channel:alias:update',
    'channel:clip:create',
    'channel:command:cooldown',
    'channel:command:create',
    'channel:command:delete',
    'channel:command:override',
    'channel:command:update',
    'channel:game:start',
    'channel:game:stop',
    'channel:gif:create',
    'channel:gif:delete',
    'channel:gif:update',
    'channel:host:update',
    'channel:points:update',
    'channel:protection:manage',
    'channel:quote:create',
    'channel:quote:delete',
    'channel:quote:update',
    'channel:regular:create',
    'channel:regular:delete',
    'channel:variable:create',
    'channel:variable:delete',
    'channel:variable:update',
  ]
});
