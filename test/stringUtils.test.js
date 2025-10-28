import { expect } from 'chai';
import { capitalize, reverseString, isPalindrome } from '../utils/stringUtils.js';

describe('String Utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).to.equal('Hello');
      expect(capitalize('world')).to.equal('World');
      expect(capitalize('javascript')).to.equal('Javascript');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).to.equal('A');
      expect(capitalize('z')).to.equal('Z');
    });

    it('should handle strings that are already capitalized', () => {
      expect(capitalize('Hello')).to.equal('Hello');
      expect(capitalize('WORLD')).to.equal('WORLD');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).to.equal('');
    });

    it('should handle strings with numbers and special characters', () => {
      expect(capitalize('123abc')).to.equal('123abc');
      expect(capitalize('!@#hello')).to.equal('!@#hello');
    });

    it('should handle strings with spaces', () => {
      expect(capitalize('hello world')).to.equal('Hello world');
      expect(capitalize(' multiple words ')).to.equal(' multiple words ');
    });

    it('should throw an error for non-string input', () => {
      expect(() => capitalize(123)).to.throw('Input must be a string');
      expect(() => capitalize(null)).to.throw('Input must be a string');
      expect(() => capitalize(undefined)).to.throw('Input must be a string');
      expect(() => capitalize({})).to.throw('Input must be a string');
      expect(() => capitalize([])).to.throw('Input must be a string');
    });
  });

  describe('reverseString', () => {
    it('should reverse a string', () => {
      expect(reverseString('hello')).to.equal('olleh');
      expect(reverseString('world')).to.equal('dlrow');
      expect(reverseString('javascript')).to.equal('tpircsavaj');
    });

    it('should handle single character strings', () => {
      expect(reverseString('a')).to.equal('a');
      expect(reverseString('z')).to.equal('z');
    });

    it('should handle empty strings', () => {
      expect(reverseString('')).to.equal('');
    });

    it('should handle strings with numbers and special characters', () => {
      expect(reverseString('123abc')).to.equal('cba321');
      expect(reverseString('!@#hello')).to.equal('olleh#@!');
    });

    it('should handle palindromes', () => {
      expect(reverseString('racecar')).to.equal('racecar');
      expect(reverseString('level')).to.equal('level');
    });

    it('should handle strings with spaces', () => {
      expect(reverseString('hello world')).to.equal('dlrow olleh');
      expect(reverseString('a b c')).to.equal('c b a');
    });

    it('should throw an error for non-string input', () => {
      expect(() => reverseString(123)).to.throw('Input must be a string');
      expect(() => reverseString(null)).to.throw('Input must be a string');
      expect(() => reverseString(undefined)).to.throw('Input must be a string');
      expect(() => reverseString({})).to.throw('Input must be a string');
      expect(() => reverseString([])).to.throw('Input must be a string');
    });
  });

  describe('isPalindrome', () => {
    it('should return true for palindromes', () => {
      expect(isPalindrome('racecar')).to.be.true;
      expect(isPalindrome('level')).to.be.true;
      expect(isPalindrome('madam')).to.be.true;
      expect(isPalindrome('a')).to.be.true;
      expect(isPalindrome('')).to.be.true;
    });

    it('should return false for non-palindromes', () => {
      expect(isPalindrome('hello')).to.be.false;
      expect(isPalindrome('world')).to.be.false;
      expect(isPalindrome('javascript')).to.be.false;
      expect(isPalindrome('ab')).to.be.false;
    });

    it('should handle case-sensitive palindromes', () => {
      expect(isPalindrome('Racecar')).to.be.false; // Case sensitive
      expect(isPalindrome('Level')).to.be.false; // Case sensitive
    });

    it('should handle palindromes with spaces', () => {
      expect(isPalindrome('race car')).to.be.false; // 'race car' reversed is 'rac ecar' - not a palindrome
      expect(isPalindrome('a b a')).to.be.true; // 'a b a' reversed is 'a b a' - is a palindrome
    });

    it('should handle palindromes with special characters', () => {
      expect(isPalindrome('race!car')).to.be.false; // 'race!car' reversed is 'rac!ecar' - not a palindrome
      expect(isPalindrome('a!a')).to.be.true; // 'a!a' reversed is 'a!a' - is a palindrome
    });

    it('should handle single character strings', () => {
      expect(isPalindrome('a')).to.be.true;
      expect(isPalindrome('z')).to.be.true;
    });

    it('should handle empty strings', () => {
      expect(isPalindrome('')).to.be.true;
    });

    it('should throw an error for non-string input', () => {
      expect(() => isPalindrome(123)).to.throw('Input must be a string');
      expect(() => isPalindrome(null)).to.throw('Input must be a string');
      expect(() => isPalindrome(undefined)).to.throw('Input must be a string');
      expect(() => isPalindrome({})).to.throw('Input must be a string');
      expect(() => isPalindrome([])).to.throw('Input must be a string');
    });
  });
});
