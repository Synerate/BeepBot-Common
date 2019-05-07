import test from 'ava';

import { Permissions, Role } from '../src/';
import { User } from '../src/permissions/roles/user';


const permissions = new Permissions();
const LoveRaiderId = "9d77f237-b412-478b-b5ed-d46611a5e074";
const LoveRaider = new Role({
    id: LoveRaiderId,
    name: "Love Raider",
    type: "custom",
    inherits: [ User ],
    permissions: [
      "command:run:love_raider"
    ],
    boost: 0.50
});

test('registers roles', t => {
  t.not(permissions.get('User'), null);
  t.not(permissions.get('Subscriber'), null);
  t.not(permissions.get('Regular'), null);
  t.not(permissions.get('Moderator'), null);
  t.not(permissions.get('ChannelEditor'), null);
  t.not(permissions.get('Owner'), null);
  t.not(permissions.get('Developer'), null);
  t.is(permissions.get('Cheese'), undefined);
});

test('registers a custom role', t => {
  permissions.registerRole(LoveRaider);
  t.not(permissions.get('Love Raider'), null);

  const Raider = permissions.get('Love Raider');
  t.true(Raider.has('command:run:love_raider'));
  t.true(Raider.has('channel:game:join'));
  t.false(Raider.has('channel:quote:delete'));
  t.is(Raider.getId(), LoveRaiderId);
});

test('get a role from an Id', t => {
  t.is(permissions.getById(LoveRaiderId), LoveRaider);
  t.not(permissions.getById(LoveRaiderId), permissions.get('Moderator'));
  t.is(permissions.getById('001'), null);
});

test('does not allow a role to be registered again', t => {
  t.throws(() => permissions.registerRole(LoveRaider), 'Role already registered');
})

test('has a slug name', t => {
  t.is(permissions.get('Moderator').getSlug(), 'moderator');
  t.is(permissions.get('Love Raider').getSlug(), 'love-raider');
});

test('checks role has permission', t => {
  const Moderator = permissions.get('Moderator');
  t.true(Moderator.has('channel:command:update'));
  t.false(Moderator.has('channel:command:forceDelete'));
});

test('adds a new permission', t => {
  const Moderator = permissions.get('Moderator');
  Moderator.add('testing:perms');
  t.true(Moderator.has('testing:perms'));
  Moderator.add('testing:perms');
  const length = Moderator.getPerms().filter(perm => perm === 'testing:perms').length;
  t.is(1, length);
});

test('removes a permission', t => {
  const Moderator = permissions.get('Moderator');
  Moderator.remove('testing:perms');
  t.false(Moderator.has('testing:perms'));
});

test('overrides the current permissions', t => {
  const Moderator = permissions.get('Moderator');
  Moderator.set([ 'channel:new:create', 'channel:new:edit' ]);
  t.false(Moderator.has('channel:command:update'));
  t.true(Moderator.has('channel:new:create'));
});

test('checks if permissions are being inherited', t => {
  const Owner = permissions.get('Owner');
  t.true(Owner.has('channel:command:forceDelete'));
  t.true(Owner.has('channel:command:create'));
  t.true(Owner.has('channel:game:join'));
  t.false(Owner.has('bot:developer:commands'));
});

test('checks if role has wildcard permissions', t => {
  const Developer = permissions.get('Developer');
  t.true(Developer.has('*'));
});

test('gets the roles which the role inherits', t => {
  const Moderator = permissions.get('Moderator');
  t.is(Moderator.getInherits().length, 1);
});

/**
 * This does not actually do what you would expect.
 * 
 * I.E. channel:*:update would return false as the code is looking for the * on the end of the scope.
 * 
 * TODO: Needs changing to allow sub "grouping" of the wildcard.
 */
test('checks if role has sub wildcard permission', t => {
  const Moderator = permissions.get('Moderator');
  Moderator.add('channel:settings:*');
  t.true(Moderator.has('channel:settings:edit'));
  Moderator.remove('channel:settings:*');
  t.false(Moderator.has('channel:settings:edit'));
});

test('gets the registered user roles', t => {
  const roles = permissions.getRoles();
  t.not(roles, undefined);
  t.is(8, Object.keys(roles).length);
  t.not(roles['Moderator'], undefined);
});

test('gets permission definition', t => {
  t.is(Permissions.describe('user:voice'), 'Allow the bot to process the users messages.');
  t.is(Permissions.describe('channel:cheese'), null);
});

test('has a xp boost', t => {
  const Moderator = permissions.get('Moderator');
  t.is(0, Moderator.getBoost());
  t.not(10, Moderator.getBoost());

  t.is(0.50, LoveRaider.getBoost());
});

test('changes the xp boost', t => {
  const Moderator = permissions.get('Moderator');
  t.is(0, Moderator.getBoost());
  Moderator.setBoost(13);
  t.is(13, Moderator.getBoost());
});

test('does allow to unregister a role', t => {
  permissions.unregisterRole(LoveRaider);
  t.is(permissions.get('Love Raider'), undefined);
});

test('does not allow to unregister a role which is not found', t => {
  t.throws(() => permissions.unregisterRole(LoveRaider), 'Role not found');
});
