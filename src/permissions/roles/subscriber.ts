import { Role } from '../role';
import { Regular } from './regular';

export const Subscriber = new Role({
    id: '5',
    name: 'Subscriber',
    type: 'internal',
    inherits: [
        Regular,
    ],
    permissions: [],
});
