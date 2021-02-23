import { Role } from '../role';
import { User } from './user';

export const Regular = new Role({
    id: '6',
    name: 'Regular',
    type: 'internal',
    inherits: [
        User,
    ],
    permissions: [
        'bot:command:fun',
        'channel:leaderboard:view',
        'channel:protection:bypass',
        'channel:commands:view',
        'channel:points:view',
        'channel:schedule:view'
    ],
});
