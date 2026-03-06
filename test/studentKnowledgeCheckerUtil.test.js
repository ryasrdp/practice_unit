import { assert } from 'chai';
import { checkStudentKnowledge } from '../utils/studentKnowledgeCheckerUtil.js';

describe('studentKnowledgeCheckerUtil', () => {
  describe('checkStudentKnowledge()', () => {
    const basicCorrectAnswers = { q1: 'a', q2: 'b', q3: 'c' };
    const singleAnswer = { q1: 'answer' };
    const emptyAnswers = {};

    it('should return true when answers match correctly', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'a', q2: 'b', q3: 'c' }, basicCorrectAnswers), true);
      assert.strictEqual(checkStudentKnowledge({ q1: 'answer' }, singleAnswer), true);
      assert.strictEqual(checkStudentKnowledge(emptyAnswers, emptyAnswers), true);
      assert.strictEqual(checkStudentKnowledge({ q1: 42, q2: 100 }, { q1: 42, q2: 100 }), true);
      assert.strictEqual(checkStudentKnowledge({ q1: true, q2: false }, { q1: true, q2: false }), true);
      assert.strictEqual(checkStudentKnowledge({ q1: 'text', q2: 42, q3: true },
        { q1: 'text', q2: 42, q3: true }), true);
    });

    it('should return false when one answer wrong', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'a', q2: 'WRONG', q3: 'c' }, basicCorrectAnswers), false);
    });

    it('should return false when fewer questions', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'a' }, basicCorrectAnswers), false);
    });

    it('should return false when more questions', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'a', q2: 'b', q3: 'c', q4: 'd' }, basicCorrectAnswers), false);
    });

    it('should return false when keys are same but in different order (bug)', () => {
      assert.strictEqual(checkStudentKnowledge({ q2: 'b', q1: 'a' }, { q1: 'a', q2: 'b' }), false);
    });

    it('should return false when keys are completely different', () => {
      assert.strictEqual(checkStudentKnowledge({ x1: 'a', x2: 'b' }, { q1: 'a', q2: 'b' }), false);
    });

    it('should return false for string \'1\' vs number 1 (strict equality)', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: '1' }, { q1: 1 }), false);
    });

    it('should return false for equivalent arrays with different references (bug)', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: [1, 2, 3] }, { q1: [1, 2, 3] }), false);
    });

    it('should return true for same array reference', () => {
      const sharedArray = [1, 2, 3];
      assert.strictEqual(checkStudentKnowledge({ q1: sharedArray }, { q1: sharedArray }), true);
    });

    it('should return false for equivalent nested objects with different references (bug)', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: { nested: 'value' } }, { q1: { nested: 'value' } }), false);
    });

    it('should return true for same object reference', () => {
      const sharedObj = { nested: 'value' };
      assert.strictEqual(checkStudentKnowledge({ q1: sharedObj }, { q1: sharedObj }), true);
    });

    it('should be case sensitive', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'answer' }, { q1: 'Answer' }), false);
    });

    it('should handle unicode characters', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 'über', q2: '日本語' }, { q1: 'über', q2: '日本語' }), true);
    });

    it('should return false for floating point precision differences', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: 0.3 }, { q1: 0.1 + 0.2 }), false);
    });

    it('should return false when both answers are NaN (bug)', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: NaN }, { q1: NaN }), false);
    });

    it('should handle many questions', () => {
      const correct = {};
      const student = {};
      for (let i = 0; i < 100; i++) {
        correct[`q${i}`] = `answer${i}`;
        student[`q${i}`] = `answer${i}`;
      }
      assert.strictEqual(checkStudentKnowledge(student, correct), true);
    });

    it('should detect single wrong answer in large set', () => {
      const correct = {};
      const student = {};
      for (let i = 0; i < 100; i++) {
        correct[`q${i}`] = `answer${i}`;
        student[`q${i}`] = i === 50 ? 'WRONG' : `answer${i}`;
      }
      assert.strictEqual(checkStudentKnowledge(student, correct), false);
    });

    it('should throw TypeError for null as studentAnswers', () => {
      assert.throws(() => checkStudentKnowledge(null, basicCorrectAnswers), TypeError);
    });

    it('should throw TypeError for undefined as studentAnswers', () => {
      assert.throws(() => checkStudentKnowledge(undefined, basicCorrectAnswers), TypeError);
    });

    it('should return false for number as studentAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(123, basicCorrectAnswers), false);
    });

    it('should return false for string as studentAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge('abc', basicCorrectAnswers), false);
    });

    it('should return false for boolean as studentAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(true, basicCorrectAnswers), false);
    });

    it('should return false for array as studentAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge([], basicCorrectAnswers), false);
    });

    it('should return false for function as studentAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(() => {}, basicCorrectAnswers), false);
    });

    it('should throw TypeError for null as correctAnswers', () => {
      assert.throws(() => checkStudentKnowledge(singleAnswer, null), TypeError);
    });

    it('should throw TypeError for undefined as correctAnswers', () => {
      assert.throws(() => checkStudentKnowledge(singleAnswer, undefined), TypeError);
    });

    it('should return false for number as correctAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(singleAnswer, 123), false);
    });

    it('should return false for string as correctAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(singleAnswer, 'abc'), false);
    });

    it('should return false for boolean as correctAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(singleAnswer, true), false);
    });

    it('should return false for array as correctAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(singleAnswer, []), false);
    });

    it('should return false for function as correctAnswers (bug, no type check)', () => {
      assert.strictEqual(checkStudentKnowledge(singleAnswer, () => {}), false);
    });

    it('should handle numeric string keys', () => {
      assert.strictEqual(checkStudentKnowledge({ '1': 'a', '2': 'b' }, { '1': 'a', '2': 'b' }), true);
    });

    it('should handle keys with special characters', () => {
      assert.strictEqual(checkStudentKnowledge({ 'q-1': 'a', 'q.2': 'b' }, { 'q-1': 'a', 'q.2': 'b' }), true);
    });

    it('should handle inherited property names as keys', () => {
      assert.strictEqual(checkStudentKnowledge({ toString: 'a', constructor: 'b' },
        { toString: 'a', constructor: 'b' }), true);
    });

    it('should handle __proto__ as key', () => {
      assert.strictEqual(checkStudentKnowledge({ '__proto__': 'a' }, { '__proto__': 'a' }), true);
    });
  });
});
