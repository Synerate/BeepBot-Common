import { Role } from '../role';

export const User = new Role({
    id: '7',
    name: 'User',
    type: 'internal',
    permissions: [
        'channel:game:join',
        'channel:game:claim'
    ],
});
