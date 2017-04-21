import { Role } from '../role';

import { User } from './user';
import { Subscriber } from './subscriber';
import { Regular } from './regular';
import { Moderator } from './moderator';
import { Editor } from './editor';
import { Owner } from './owner';
import { Developer } from './developer';

export const Roles: Role[] = [
  User,
  Subscriber,
  Regular,
  Moderator,
  Editor,
  Owner,
  Developer
];
