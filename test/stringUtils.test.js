import { assert } from 'chai';
import * as stringUtils from '../utils/stringUtils.js';

describe('stringUtils', () => {
  const invalidInputs = [
    { value: 123, description: 'number' },
    { value: null, description: 'null' },
    { value: undefined, description: 'undefined' },
    { value: {}, description: 'object' },
    { value: [], description: 'array' },
    { value: true, description: 'boolean' },
  ];

  describe('capitalize()', () => {
    it('should capitalize the first character of a string', () => {
      assert.strictEqual(stringUtils.capitalize('hello'), 'Hello');
    });

    it('should handle single character strings', () => {
      assert.strictEqual(stringUtils.capitalize('a'), 'A');
    });

    it('should handle strings starting with numbers or special characters', () => {
      assert.strictEqual(stringUtils.capitalize('☻◘'), '☻◘');
    });

    it('should handle whitespace-only strings', () => {
      assert.strictEqual(stringUtils.capitalize('   '), '   ');
      assert.strictEqual(stringUtils.capitalize('\t'), '\t');
      assert.strictEqual(stringUtils.capitalize('\n'), '\n');
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.capitalize('über'), 'Über');
    });

    for (const { value, description } of invalidInputs) {
      it(`should throw an error for ${description} input`, () => {
        assert.throws(() => stringUtils.capitalize(value), Error);
      });
    }
  });

  describe('reverseString()', () => {
    it('should reverse a string', () => {
      assert.strictEqual(stringUtils.reverseString('hello'), 'olleh');
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.reverseString('héllo'), 'olléh');
    });

    for (const { value, description } of invalidInputs) {
      it(`should throw an error for ${description} input`, () => {
        assert.throws(() => stringUtils.reverseString(value), Error);
      });
    }
  });

  describe('isPalindrome()', () => {
    it('should return true for palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('racecar'), true);
    });

    it('should return false for non-palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('hello'), false);
    });

    it('should be case-sensitive', () => {
      assert.strictEqual(stringUtils.isPalindrome('Racecar'), false);
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.isPalindrome('日本日'), true);
    });

    for (const { value, description } of invalidInputs) {
      it(`should throw an error for ${description} input`, () => {
        assert.throws(() => stringUtils.isPalindrome(value), Error);
      });
    }
  });
});
