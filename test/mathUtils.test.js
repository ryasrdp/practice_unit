import { assert } from 'chai';
import * as mathUtils from '../utils/mathUtils.js';

describe('mathUtils', () => {
  describe('add()', () => {
    it('should return the sum of two numbers', () => {
      assert.strictEqual(mathUtils.add(2, 3), 5);
      assert.strictEqual(mathUtils.add(-2, 3), 1);
    });
    it('should suffer from floating-point precision', () => {
      assert.notStrictEqual(mathUtils.add(0.1, 0.2), 0.3);
      assert.approximately(mathUtils.add(0.1, 0.2), 0.3, 1e-15);
    });
    it('should concatenate when given strings', () => {
      assert.strictEqual(mathUtils.add('2', 3), '23');
      assert.strictEqual(mathUtils.add(2, '3'), '23');
      assert.strictEqual(mathUtils.add('2', '3'), '23');
    });
    it('should return Infinity on overflow', () => {
      const largeNumber = Number.MAX_VALUE;
      assert.strictEqual(mathUtils.add(largeNumber, largeNumber), Infinity);
      assert.strictEqual(mathUtils.add(-largeNumber, -largeNumber), -Infinity);
    });
  });
  describe('subtract()', () => {
    it('should return the difference of two numbers', () => {
      assert.strictEqual(mathUtils.subtract(5, 3), 2);
      assert.strictEqual(mathUtils.subtract(-2, 3), -5);
    });
    it('should suffer from floating-point precision', () => {
      assert.notStrictEqual(mathUtils.subtract(0.3, 0.1), 0.2);
      assert.approximately(mathUtils.subtract(0.3, 0.1), 0.2, 1e-15);
    });
    it('should coerce numeric strings to numbers', () => {
      assert.strictEqual(mathUtils.subtract('5', 3), 2);
      assert.strictEqual(mathUtils.subtract(5, '3'), 2);
      assert.strictEqual(mathUtils.subtract('5', '3'), 2);
    });
    it('should return Infinity on overflow', () => {
      const largeNumber = Number.MAX_VALUE;
      assert.strictEqual(mathUtils.subtract(largeNumber, -largeNumber), Infinity);
      assert.strictEqual(mathUtils.subtract(-largeNumber, largeNumber), -Infinity);
    });
  });
  describe('multiply()', () => {
    it('should return the product of two numbers', () => {
      assert.strictEqual(mathUtils.multiply(2, 3), 6);
      assert.strictEqual(mathUtils.multiply(-2, 3), -6);
    });
    it('should suffer from floating-point precision', () => {
      assert.notStrictEqual(mathUtils.multiply(0.1, 0.2), 0.02);
      assert.approximately(mathUtils.multiply(0.1, 0.2), 0.02, 1e-15);
    });
    it('should coerce numeric strings to numbers', () => {
      assert.strictEqual(mathUtils.multiply('2', 3), 6);
      assert.strictEqual(mathUtils.multiply(2, '3'), 6);
      assert.strictEqual(mathUtils.multiply('2', '3'), 6);
    });
    it('should return Infinity on overflow', () => {
      const largeNumber = Number.MAX_VALUE;
      assert.strictEqual(mathUtils.multiply(largeNumber, 2), Infinity);
      assert.strictEqual(mathUtils.multiply(-largeNumber, 2), -Infinity);
    });
    it('should return 0 on underflow', () => {
      const smallNumber = Number.MIN_VALUE;
      assert.strictEqual(mathUtils.multiply(smallNumber, 0.5), 0);
      assert.strictEqual(mathUtils.multiply(-smallNumber, 0.5), 0);
    });
  });
  describe('divide()', () => {
    it('should return the quotient of two numbers', () => {
      assert.strictEqual(mathUtils.divide(6, 3), 2);
      assert.strictEqual(mathUtils.divide(-6, 3), -2);
    });
    it('should return the quotient of two floating-point numbers', () => {
      assert.strictEqual(mathUtils.divide(0.2, 0.1), 2);
      assert.strictEqual(mathUtils.divide(-0.2, 0.1), -2);
    });
    it('should coerce numeric strings to numbers', () => {
      assert.strictEqual(mathUtils.divide('6', 3), 2);
      assert.strictEqual(mathUtils.divide(6, '3'), 2);
      assert.strictEqual(mathUtils.divide('6', '3'), 2);
    });
    it('should throw an error when dividing by zero', () => {
      assert.throws(() => mathUtils.divide(6, 0), Error);
      assert.throws(() => mathUtils.divide(-6, 0), Error);
    });
    it('should return Infinity on overflow', () => {
      const largeNumber = Number.MAX_VALUE;
      assert.strictEqual(mathUtils.divide(largeNumber, 0.5), Infinity);
      assert.strictEqual(mathUtils.divide(-largeNumber, 0.5), -Infinity);
    });
    it('should return 0 on underflow', () => {
      const smallNumber = Number.MIN_VALUE;
      assert.strictEqual(mathUtils.divide(smallNumber, 2), 0);
      assert.strictEqual(mathUtils.divide(-smallNumber, 2), 0);
    });
  });
});
