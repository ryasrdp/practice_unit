import { assert } from 'chai';
import * as userListUtils from '../utils/usersListUtils.js';

describe('userListUtils', () => {
  const validUsers = [
    { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    { id: 4, name: 'Diana', age: 18, email: 'diana@example.com' },
    { id: 5, name: 'Eve', age: 65, email: 'eve@example.com' },
  ];

  describe('filterUsersByAge()', () => {
    it('should return users within age range', () => {
      const result = userListUtils.filterUsersByAge(validUsers, 25, 35);
      assert.strictEqual(result.length, 3);
      assert.ok(result.some(u => u.name === 'Alice'));
      assert.ok(result.some(u => u.name === 'Bob'));
      assert.ok(result.some(u => u.name === 'Charlie'));
    });

    it('should throw Error for non-array input', () => {
      assert.throws(() => userListUtils.filterUsersByAge(null, 18, 65), Error);
    });

    it('should throw with message indicating users must be array', () => {
      try {
        userListUtils.filterUsersByAge('invalid', 18, 65);
        assert.fail('Should have thrown');
      } catch (e) {
        assert.match(e.message, /users must be an array/i);
      }
    });

    it('should include user exactly at minAge', () => {
      const result = userListUtils.filterUsersByAge(validUsers, 18, 20);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].name, 'Diana');
    });

    it('should include user exactly at maxAge', () => {
      const result = userListUtils.filterUsersByAge(validUsers, 60, 65);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].name, 'Eve');
    });

    it('should exclude users just outside boundaries', () => {
      const result = userListUtils.filterUsersByAge(validUsers, 19, 64);
      assert.ok(!result.some(u => u.name === 'Diana'));
      assert.ok(!result.some(u => u.name === 'Eve'));
    });

    it('should handle floating point ages', () => {
      const usersWithFloatAge = [{ id: 1, name: 'User', age: 25.5 }];
      assert.strictEqual(userListUtils.filterUsersByAge(usersWithFloatAge, 25, 26).length, 1);
      assert.strictEqual(userListUtils.filterUsersByAge(usersWithFloatAge, 26, 27).length, 0);
    });

    it('should handle users with missing age property', () => {
      const usersWithMissingAge = [{ id: 1, name: 'NoAge' }];
      const result = userListUtils.filterUsersByAge(usersWithMissingAge, 18, 65);
      assert.deepEqual(result, []);
    });

    it('should handle sparse arrays', () => {
      const sparseUsers = [validUsers[0], , validUsers[2]];
      const result = userListUtils.filterUsersByAge(sparseUsers, 18, 65);
      assert.ok(Array.isArray(result));
    });

    it('should handle Infinity age values', () => {
      const usersWithInfinityAge = [{ id: 1, name: 'Infinity', age: Infinity }];
      assert.strictEqual(userListUtils.filterUsersByAge(usersWithInfinityAge, 0, Infinity).length, 1);
      assert.strictEqual(userListUtils.filterUsersByAge(usersWithInfinityAge, 0, 100).length, 0);
    });

    it('should handle string age that looks numeric', () => {
      const usersWithStringAge = [{ id: 1, name: 'StringAge', age: '30' }];
      const result = userListUtils.filterUsersByAge(usersWithStringAge, 18, 65);
      assert.strictEqual(result.length, 1);
    });
  });

  describe('sortUsersByName()', () => {
    it('should sort users alphabetically by name', () => {
      const result = userListUtils.sortUsersByName(validUsers);
      assert.strictEqual(result[0].name, 'Alice');
      assert.strictEqual(result[1].name, 'Bob');
      assert.strictEqual(result[2].name, 'Charlie');
      assert.strictEqual(result[3].name, 'Diana');
      assert.strictEqual(result[4].name, 'Eve');
    });

    it('should throw Error for non-array input', () => {
      assert.throws(() => userListUtils.sortUsersByName(null), Error);
      assert.throws(() => userListUtils.sortUsersByName(undefined), Error);
      assert.throws(() => userListUtils.sortUsersByName('users'), Error);
      assert.throws(() => userListUtils.sortUsersByName({}), Error);
      assert.throws(() => userListUtils.sortUsersByName(123), Error);
    });

    it('should throw with message indicating users must be array', () => {
      try {
        userListUtils.sortUsersByName('invalid');
        assert.fail('Should have thrown');
      } catch (e) {
        assert.match(e.message, /users must be an array/i);
      }
    });

    it('should return a new array (not mutate original)', () => {
      const original = [...validUsers];
      const result = userListUtils.sortUsersByName(validUsers);
      assert.notStrictEqual(result, validUsers);
      assert.deepEqual(validUsers, original);
    });

    it('should handle case-insensitive sorting (localeCompare behavior)', () => {
      const mixedCaseUsers = [
        { id: 1, name: 'bob' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'charlie' },
      ];
      const result = userListUtils.sortUsersByName(mixedCaseUsers);
      assert.strictEqual(result[0].name, 'Alice');
      assert.strictEqual(result[1].name, 'bob');
      assert.strictEqual(result[2].name, 'charlie');
    });

    it('should place undefined elements at end for sparse arrays', () => {
      const sparseUsers = [{ id: 1, name: 'Zara' }, , { id: 3, name: 'Anna' }];
      const result = userListUtils.sortUsersByName(sparseUsers);
      assert.strictEqual(result.length, 3);
      assert.strictEqual(result[0].name, 'Anna');
      assert.strictEqual(result[1].name, 'Zara');
      assert.strictEqual(result[2], undefined);
    });

    it('should handle numeric string names', () => {
      const numericNameUsers = [
        { id: 1, name: '10' },
        { id: 2, name: '2' },
        { id: 3, name: '1' },
      ];
      const result = userListUtils.sortUsersByName(numericNameUsers);
      assert.strictEqual(result[0].name, '1');
      assert.strictEqual(result[1].name, '10');
      assert.strictEqual(result[2].name, '2');
    });
  });

  describe('findUserById()', () => {
    it('should return user when id matches', () => {
      const result = userListUtils.findUserById(validUsers, 1);
      assert.strictEqual(result.name, 'Alice');
      assert.strictEqual(result.id, 1);
    });

    it('should return null when id not found', () => {
      const result = userListUtils.findUserById(validUsers, 999);
      assert.strictEqual(result, null);
    });

    it('should throw Error for non-array input', () => {
      assert.throws(() => userListUtils.findUserById(null, 1), Error);
      assert.throws(() => userListUtils.findUserById(undefined, 1), Error);
      assert.throws(() => userListUtils.findUserById('users', 1), Error);
      assert.throws(() => userListUtils.findUserById({}, 1), Error);
      assert.throws(() => userListUtils.findUserById(123, 1), Error);
    });

    it('should throw with message indicating users must be array', () => {
      try {
        userListUtils.findUserById('invalid', 1);
        assert.fail('Should have thrown');
      } catch (e) {
        assert.match(e.message, /users must be an array/i);
      }
    });

    it('should use strict equality for id comparison', () => {
      const result = userListUtils.findUserById(validUsers, '1');
      assert.strictEqual(result, null);
    });

    it('should return first matching user when duplicates exist', () => {
      const duplicateIdUsers = [
        { id: 1, name: 'First' },
        { id: 1, name: 'Second' },
      ];
      const result = userListUtils.findUserById(duplicateIdUsers, 1);
      assert.strictEqual(result.name, 'First');
    });

    it('should return the actual user object reference', () => {
      const result = userListUtils.findUserById(validUsers, 1);
      assert.strictEqual(result, validUsers[0]);
    });

    it('should crash on sparse arrays', () => {
      const sparseUsers = [{ id: 1, name: 'First' }, , { id: 3, name: 'Third' }];
      assert.throws(() => userListUtils.findUserById(sparseUsers, 2), TypeError);
    });
  });

  describe('isEmailTaken()', () => {
    it('should return true when email exists', () => {
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, 'alice@example.com'), true);
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, 'bob@example.com'), true);
    });

    it('should return false when email does not exist', () => {
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, 'notfound@example.com'), false);
    });

    it('should throw Error for non-array input', () => {
      assert.throws(() => userListUtils.isEmailTaken(null, 'test@example.com'), Error);
      assert.throws(() => userListUtils.isEmailTaken(undefined, 'test@example.com'), Error);
      assert.throws(() => userListUtils.isEmailTaken('users', 'test@example.com'), Error);
      assert.throws(() => userListUtils.isEmailTaken({}, 'test@example.com'), Error);
      assert.throws(() => userListUtils.isEmailTaken(123, 'test@example.com'), Error);
    });

    it('should throw with message indicating users must be array', () => {
      try {
        userListUtils.isEmailTaken('invalid', 'test@example.com');
        assert.fail('Should have thrown');
      } catch (e) {
        assert.match(e.message, /users must be an array/i);
      }
    });

    it('should be case-sensitive for email comparison', () => {
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, 'ALICE@EXAMPLE.COM'), false);
    });

    it('should handle email with whitespace', () => {
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, ' alice@example.com'), false);
      assert.strictEqual(userListUtils.isEmailTaken(validUsers, 'alice@example.com '), false);
    });

    it('should handle users with missing email property', () => {
      const usersWithMissingEmail = [{ id: 1, name: 'NoEmail' }];
      assert.strictEqual(userListUtils.isEmailTaken(usersWithMissingEmail, undefined), true);
      assert.strictEqual(userListUtils.isEmailTaken(usersWithMissingEmail, 'test@example.com'), false);
    });

    it('should use strict equality for email comparison', () => {
      const usersWithNumericEmail = [{ id: 1, name: 'NumericEmail', email: 123 }];
      assert.strictEqual(userListUtils.isEmailTaken(usersWithNumericEmail, '123'), false);
      assert.strictEqual(userListUtils.isEmailTaken(usersWithNumericEmail, 123), true);
    });
  });
});
