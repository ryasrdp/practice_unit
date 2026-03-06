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
      assert.strictEqual(stringUtils.capitalize('world'), 'World');
    });

    it('should handle single character strings', () => {
      assert.strictEqual(stringUtils.capitalize('a'), 'A');
      assert.strictEqual(stringUtils.capitalize('z'), 'Z');
    });

    it('should return empty string for empty input', () => {
      assert.strictEqual(stringUtils.capitalize(''), '');
    });

    it('should handle already capitalized strings', () => {
      assert.strictEqual(stringUtils.capitalize('Hello'), 'Hello');
      assert.strictEqual(stringUtils.capitalize('WORLD'), 'WORLD');
    });

    it('should handle strings starting with numbers or special characters', () => {
      assert.strictEqual(stringUtils.capitalize('123abc'), '123abc');
      assert.strictEqual(stringUtils.capitalize('!hello'), '!hello');
      assert.strictEqual(stringUtils.capitalize(' hello'), ' hello');
      assert.strictEqual(stringUtils.capitalize('☻◘'), '☻◘');
    });

    it('should handle whitespace-only strings', () => {
      assert.strictEqual(stringUtils.capitalize('   '), '   ');
      assert.strictEqual(stringUtils.capitalize('\t'), '\t');
      assert.strictEqual(stringUtils.capitalize('\n'), '\n');
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.capitalize('über'), 'Über');
      assert.strictEqual(stringUtils.capitalize('élan'), 'Élan');
      assert.strictEqual(stringUtils.capitalize('日本語'), '日本語');
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
      assert.strictEqual(stringUtils.reverseString('world'), 'dlrow');
    });

    it('should handle single character strings', () => {
      assert.strictEqual(stringUtils.reverseString('a'), 'a');
      assert.strictEqual(stringUtils.reverseString('Z'), 'Z');
    });

    it('should return empty string for empty input', () => {
      assert.strictEqual(stringUtils.reverseString(''), '');
    });

    it('should handle palindromes (result equals input)', () => {
      assert.strictEqual(stringUtils.reverseString('racecar'), 'racecar');
      assert.strictEqual(stringUtils.reverseString('madam'), 'madam');
    });

    it('should handle strings with spaces', () => {
      assert.strictEqual(stringUtils.reverseString('hello world'), 'dlrow olleh');
      assert.strictEqual(stringUtils.reverseString('  '), '  ');
    });

    it('should handle strings with special characters', () => {
      assert.strictEqual(stringUtils.reverseString('!@#$'), '$#@!');
      assert.strictEqual(stringUtils.reverseString('a-b-c'), 'c-b-a');
    });

    it('should handle strings with numbers', () => {
      assert.strictEqual(stringUtils.reverseString('12345'), '54321');
      assert.strictEqual(stringUtils.reverseString('abc123'), '321cba');
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.reverseString('héllo'), 'olléh');
      assert.strictEqual(stringUtils.reverseString('日本'), '本日');
    });

    it('should handle mixed case strings', () => {
      assert.strictEqual(stringUtils.reverseString('HeLLo'), 'oLLeH');
      assert.strictEqual(stringUtils.reverseString('ABC'), 'CBA');
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
      assert.strictEqual(stringUtils.isPalindrome('madam'), true);
      assert.strictEqual(stringUtils.isPalindrome('level'), true);
    });

    it('should return false for non-palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('hello'), false);
      assert.strictEqual(stringUtils.isPalindrome('world'), false);
      assert.strictEqual(stringUtils.isPalindrome('abc'), false);
    });

    it('should return true for single character strings', () => {
      assert.strictEqual(stringUtils.isPalindrome('a'), true);
      assert.strictEqual(stringUtils.isPalindrome('Z'), true);
    });

    it('should return true for empty string', () => {
      assert.strictEqual(stringUtils.isPalindrome(''), true);
    });

    it('should be case-sensitive', () => {
      assert.strictEqual(stringUtils.isPalindrome('Racecar'), false);
      assert.strictEqual(stringUtils.isPalindrome('Madam'), false);
    });

    it('should handle strings with spaces (exact match)', () => {
      assert.strictEqual(stringUtils.isPalindrome('a b a'), true);
      assert.strictEqual(stringUtils.isPalindrome('ab a'), false);
      assert.strictEqual(stringUtils.isPalindrome('   '), true);
    });

    it('should handle numeric strings', () => {
      assert.strictEqual(stringUtils.isPalindrome('12321'), true);
      assert.strictEqual(stringUtils.isPalindrome('12345'), false);
    });

    it('should handle special character palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('!@!'), true);
      assert.strictEqual(stringUtils.isPalindrome('!@#'), false);
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(stringUtils.isPalindrome('日本日'), true);
      assert.strictEqual(stringUtils.isPalindrome('日本'), false);
    });

    it('should handle even length palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('abba'), true);
      assert.strictEqual(stringUtils.isPalindrome('noon'), true);
    });

    it('should handle odd length palindromes', () => {
      assert.strictEqual(stringUtils.isPalindrome('aba'), true);
      assert.strictEqual(stringUtils.isPalindrome('abcba'), true);
    });

    for (const { value, description } of invalidInputs) {
      it(`should throw an error for ${description} input`, () => {
        assert.throws(() => stringUtils.isPalindrome(value), Error);
      });
    }
  });
});
