import { Role } from '../role';
import { Developer } from './developer';
import { Editor } from './editor';
import { Moderator } from './moderator';
import { Owner } from './owner';
import { Regular } from './regular';
import { Subscriber } from './subscriber';
import { User } from './user';
import { VIP } from './vip';

export const Roles: Role[] = [
    User,
    Regular,
    Subscriber,
    VIP,
    Moderator,
    Editor,
    Owner,
    Developer,
];
