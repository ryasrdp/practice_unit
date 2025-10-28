import { expect } from 'chai';
import { findMax, findMin, removeDuplicates } from '../utils/arrayUtils.js';

describe('Array Utils', () => {
  describe('findMax', () => {
    it('should return the maximum value from an array of numbers', () => {
      expect(findMax([1, 5, 3, 9, 2])).to.equal(9);
      expect(findMax([-1, -5, -3, -9, -2])).to.equal(-1);
      expect(findMax([42])).to.equal(42);
    });

    it('should handle arrays with duplicate maximum values', () => {
      expect(findMax([1, 5, 5, 3, 2])).to.equal(5);
      expect(findMax([9, 9, 9, 9])).to.equal(9);
    });

    it('should handle arrays with decimal numbers', () => {
      expect(findMax([1.5, 2.7, 3.1, 1.2])).to.equal(3.1);
      expect(findMax([-1.5, -2.7, -3.1, -1.2])).to.equal(-1.2);
    });

    it('should throw an error for non-array input', () => {
      expect(() => findMax('not an array')).to.throw('Input must be an array');
      expect(() => findMax(123)).to.throw('Input must be an array');
      expect(() => findMax({})).to.throw('Input must be an array');
      expect(() => findMax(null)).to.throw('Input must be an array');
      expect(() => findMax(undefined)).to.throw('Input must be an array');
    });

    it('should handle empty arrays', () => {
      expect(findMax([])).to.equal(-Infinity);
    });
  });

  describe('findMin', () => {
    it('should return the minimum value from an array of numbers', () => {
      expect(findMin([1, 5, 3, 9, 2])).to.equal(1);
      expect(findMin([-1, -5, -3, -9, -2])).to.equal(-9);
      expect(findMin([42])).to.equal(42);
    });

    it('should handle arrays with duplicate minimum values', () => {
      expect(findMin([1, 1, 5, 3, 2])).to.equal(1);
      expect(findMin([9, 9, 9, 9])).to.equal(9);
    });

    it('should handle arrays with decimal numbers', () => {
      expect(findMin([1.5, 2.7, 3.1, 1.2])).to.equal(1.2);
      expect(findMin([-1.5, -2.7, -3.1, -1.2])).to.equal(-3.1);
    });

    it('should throw an error for non-array input', () => {
      expect(() => findMin('not an array')).to.throw('Input must be an array');
      expect(() => findMin(123)).to.throw('Input must be an array');
      expect(() => findMin({})).to.throw('Input must be an array');
      expect(() => findMin(null)).to.throw('Input must be an array');
      expect(() => findMin(undefined)).to.throw('Input must be an array');
    });

    it('should handle empty arrays', () => {
      expect(findMin([])).to.equal(Infinity);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate values from an array', () => {
      expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).to.deep.equal([1, 2, 3, 4, 5]);
      expect(removeDuplicates(['a', 'b', 'b', 'c', 'd', 'd', 'e'])).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    });

    it('should handle arrays with no duplicates', () => {
      expect(removeDuplicates([1, 2, 3, 4, 5])).to.deep.equal([1, 2, 3, 4, 5]);
      expect(removeDuplicates(['a', 'b', 'c', 'd', 'e'])).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    });

    it('should handle arrays with all identical elements', () => {
      expect(removeDuplicates([1, 1, 1, 1, 1])).to.deep.equal([1]);
      expect(removeDuplicates(['a', 'a', 'a', 'a'])).to.deep.equal(['a']);
    });

    it('should handle empty arrays', () => {
      expect(removeDuplicates([])).to.deep.equal([]);
    });

    it('should handle arrays with mixed data types', () => {
      expect(removeDuplicates([1, '1', 2, '2', 3])).to.deep.equal([1, '1', 2, '2', 3]);
      expect(removeDuplicates([true, false, true, false])).to.deep.equal([true, false]);
    });

    it('should throw an error for non-array input', () => {
      expect(() => removeDuplicates('not an array')).to.throw('Input must be an array');
      expect(() => removeDuplicates(123)).to.throw('Input must be an array');
      expect(() => removeDuplicates({})).to.throw('Input must be an array');
      expect(() => removeDuplicates(null)).to.throw('Input must be an array');
      expect(() => removeDuplicates(undefined)).to.throw('Input must be an array');
    });
  });
});
