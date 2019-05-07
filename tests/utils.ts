import test from 'ava';

import { Utils } from '../src/';

test('collects string parts', t => {
  const parts = 'I am testing the collecting of parts'.split(' ');

  t.throws(() => Utils.collectParts(parts, '......'), 'Invalid task format');

  t.deepEqual(Utils.collectParts(parts, '0..'), parts);
  t.deepEqual(Utils.collectParts(parts, '1'), [parts[1]]);
  t.deepEqual(Utils.collectParts(parts, '3..'), parts.slice(3, parts.length));
  t.deepEqual(Utils.collectParts(parts, '0-2'), parts.slice(0, 2));
});

test('strips user tagging', t => {
  t.is(Utils.stripUserTag('@artdude543'), 'artdude543');
  t.is(Utils.stripUserTag('#artdude543'), 'artdude543');
  t.is(Utils.stripUserTag('artdude543'), 'artdude543');
});

test('strips command prefixing', t => {
  t.is(Utils.stripCommand('!', '!cmd'), 'cmd');
  t.is(Utils.stripCommand('>', '!cmd'), '!cmd');
});

test('converts bytes to be human readable', t => {
  t.is(Utils.bytesToSize(0), '0 Byte');
  t.is(Utils.bytesToSize(10000), '9.77 KB');
  t.is(Utils.bytesToSize(54684646546), '50.9 GB');
});
