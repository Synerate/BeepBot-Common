import { test } from 'ava';

import { Locale } from '../src/';

test('gets the translation', t => {
  t.is(Locale.get('en_US', 'word.quote'), 'quote');
  t.is(Locale.get('cheese', 'generic.edited'), '@%s the %s `%s` has been edited.');
});

test('translates the string', t => {
  t.is(Locale.translate('en_US', 'word.quote'), 'quote');
  t.is(Locale.translate('en_US', 'generic.added', 'artdude543', 'quote'), '@artdude543 the quote has been added successfully.');
});

test('formats the string', t => {
  t.is(Locale.format('Hey there @%s!', 'artdude543'), 'Hey there @artdude543!');
  t.is(Locale.format('Hey there!', 'artdude543'), 'Hey there!');

  t.is(Locale.format('See numbers! %d', 1), 'See numbers! 1');
});
