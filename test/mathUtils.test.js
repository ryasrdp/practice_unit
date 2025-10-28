import { expect } from 'chai';
import { add, subtract, multiply, divide } from '../utils/mathUtils.js';

describe('Math Utils', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).to.equal(5);
      expect(add(10, 15)).to.equal(25);
      expect(add(0, 5)).to.equal(5);
    });

    it('should add two negative numbers', () => {
      expect(add(-2, -3)).to.equal(-5);
      expect(add(-10, -15)).to.equal(-25);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).to.equal(2);
      expect(add(-5, 3)).to.equal(-2);
      expect(add(10, -10)).to.equal(0);
    });

    it('should handle decimal numbers', () => {
      expect(add(1.5, 2.3)).to.equal(3.8);
      expect(add(0.1, 0.2)).to.be.closeTo(0.3, 0.0001);
    });

    it('should handle zero', () => {
      expect(add(0, 0)).to.equal(0);
      expect(add(5, 0)).to.equal(5);
      expect(add(0, 5)).to.equal(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).to.equal(2);
      expect(subtract(10, 4)).to.equal(6);
      expect(subtract(5, 5)).to.equal(0);
    });

    it('should subtract two negative numbers', () => {
      expect(subtract(-5, -3)).to.equal(-2);
      expect(subtract(-10, -4)).to.equal(-6);
    });

    it('should subtract positive and negative numbers', () => {
      expect(subtract(5, -3)).to.equal(8);
      expect(subtract(-5, 3)).to.equal(-8);
    });

    it('should handle decimal numbers', () => {
      expect(subtract(3.8, 1.5)).to.equal(2.3);
      expect(subtract(0.3, 0.1)).to.be.closeTo(0.2, 0.0001);
    });

    it('should handle zero', () => {
      expect(subtract(0, 0)).to.equal(0);
      expect(subtract(5, 0)).to.equal(5);
      expect(subtract(0, 5)).to.equal(-5);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(2, 3)).to.equal(6);
      expect(multiply(4, 5)).to.equal(20);
      expect(multiply(10, 10)).to.equal(100);
    });

    it('should multiply two negative numbers', () => {
      expect(multiply(-2, -3)).to.equal(6);
      expect(multiply(-4, -5)).to.equal(20);
    });

    it('should multiply positive and negative numbers', () => {
      expect(multiply(2, -3)).to.equal(-6);
      expect(multiply(-2, 3)).to.equal(-6);
    });

    it('should handle decimal numbers', () => {
      expect(multiply(2.5, 4)).to.equal(10);
      expect(multiply(1.5, 2.5)).to.equal(3.75);
    });

    it('should handle zero', () => {
      expect(multiply(0, 5)).to.equal(0);
      expect(multiply(5, 0)).to.equal(0);
      expect(multiply(0, 0)).to.equal(0);
    });

    it('should handle one', () => {
      expect(multiply(1, 5)).to.equal(5);
      expect(multiply(5, 1)).to.equal(5);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(divide(6, 2)).to.equal(3);
      expect(divide(15, 3)).to.equal(5);
      expect(divide(10, 2)).to.equal(5);
    });

    it('should divide two negative numbers', () => {
      expect(divide(-6, -2)).to.equal(3);
      expect(divide(-15, -3)).to.equal(5);
    });

    it('should divide positive and negative numbers', () => {
      expect(divide(6, -2)).to.equal(-3);
      expect(divide(-6, 2)).to.equal(-3);
    });

    it('should handle decimal numbers', () => {
      expect(divide(7.5, 2.5)).to.equal(3);
      expect(divide(10, 3)).to.be.closeTo(3.3333, 0.0001);
    });

    it('should handle zero as dividend', () => {
      expect(divide(0, 5)).to.equal(0);
      expect(divide(0, -5)).to.equal(0);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(5, 0)).to.throw('Cannot divide by zero');
      expect(() => divide(-5, 0)).to.throw('Cannot divide by zero');
      expect(() => divide(0, 0)).to.throw('Cannot divide by zero');
    });

    it('should handle one as divisor', () => {
      expect(divide(5, 1)).to.equal(5);
      expect(divide(-5, 1)).to.equal(-5);
    });
  });
});
