import { assert } from 'chai';
import * as arrayUtils from '../utils/arrayUtils.js';

describe('arrayUtils', () => {
  describe('findMax()', () => {
    it('Should return the maximum value in an array', () => {
      assert.equal(arrayUtils.findMax([1, 2, 3, 5, 6, 1231, 3]), 1231);
      assert.equal(arrayUtils.findMax([-1, -2, -3, -5, -6, -1231, -3]), -1);
    });
    it('Should return -Infinity for an empty array (bug)', () => {
      assert.equal(arrayUtils.findMax([]), -Infinity);
    });
    it('Should throw an error if the input is not an array', () => {
      assert.throws(() => arrayUtils.findMax('not an array'), Error);
      assert.throws(() => arrayUtils.findMax(123), Error);
      assert.throws(() => arrayUtils.findMax({}), Error);
    });
    it('Should return NaN if the array contains non-numeric values (bug)', () => {
      assert.isNaN(arrayUtils.findMax([1, 2, 'three', 4]));
      assert.equal(arrayUtils.findMax([1, 2, null, 4]), 4);
      assert.isNaN(arrayUtils.findMax([1, 2, undefined, 4]));
    });
  });

  describe('findMin()', () => {
    it('Should return the minimum value in an array', () => {
      assert.equal(arrayUtils.findMin([1, 2, 3, 5, 6, 1231, 3]), 1);
      assert.equal(arrayUtils.findMin([-1, -2, -3, -5, -6, -1231, -3]), -1231);
    });
    it('Should return Infinity for an empty array (bug)', () => {
      assert.equal(arrayUtils.findMin([]), Infinity);
    });
    it('Should throw an error if the input is not an array', () => {
      assert.throws(() => arrayUtils.findMin('not an array'), Error);
      assert.throws(() => arrayUtils.findMin(123), Error);
      assert.throws(() => arrayUtils.findMin({}), Error);
    });
    it('Should return NaN if the array contains non-numeric values (bug)', () => {
      assert.isNaN(arrayUtils.findMin([1, 2, 'three', 4]));
      assert.equal(arrayUtils.findMin([1, 2, null, 4]), 0);
      assert.isNaN(arrayUtils.findMin([1, 2, undefined, 4]));
    });
  });

  describe('removeDuplicates()', () => {
    it('Should return an array with duplicates removed', () => {
      assert.deepEqual(arrayUtils.removeDuplicates([1, 2, 3, 2, 4, 1]), [1, 2, 3, 4]);
      assert.deepEqual(arrayUtils.removeDuplicates(['a', 'b', 'a', 'c']), ['a', 'b', 'c']);
      assert.deepEqual(arrayUtils.removeDuplicates([1, '1', 2, '2']), [1, '1', 2, '2']);
    });
    it('Should throw an error if the input is not an array', () => {
      assert.throws(() => arrayUtils.removeDuplicates('not an array'), Error);
      assert.throws(() => arrayUtils.removeDuplicates(123), Error);
      assert.throws(() => arrayUtils.removeDuplicates({}), Error);
    });
  });
});
