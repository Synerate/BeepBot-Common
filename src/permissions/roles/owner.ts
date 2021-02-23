import { Role } from '../role';
import { Editor } from './editor';

export const Owner = new Role({
    id: '1',
    name: 'Owner',
    type: 'internal',
    inherits: [
        Editor,
    ],
    permissions: [
        'channel:bot:update',
        'channel:bot:create',
    ],
});
