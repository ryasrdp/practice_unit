import { assert } from 'chai';
import { checkStudentKnowledge } from '../utils/studentKnowledgeCheckerUtil.js';

describe('studentKnowledgeCheckerUtil', () => {
  describe('checkStudentKnowledge()', () => {
    const basicCorrectAnswers = { q1: 'a', q2: 'b', q3: 'c' };

    it('should return true when answers match correctly', () => {
      assert.strictEqual(checkStudentKnowledge(basicCorrectAnswers, basicCorrectAnswers), true);
      assert.strictEqual(checkStudentKnowledge({ q1: 228, q2: 69 }, { q1: 228, q2: 69 }), true);
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

    it('should return false when keys are same but in different order', () => {
      assert.strictEqual(checkStudentKnowledge({ q2: 'b', q1: 'a' }, { q1: 'a', q2: 'b' }), false);
    });

    it('should return false when keys are completely different', () => {
      assert.strictEqual(checkStudentKnowledge({ x1: 'a', x2: 'b' }, { q1: 'a', q2: 'b' }), false);
    });

    it('should return false for string \'1\' vs number 1 (strict equality)', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: '1' }, { q1: 1 }), false);
    });

    it('should return false for equivalent arrays with different references', () => {
      assert.strictEqual(checkStudentKnowledge({ q1: [1, 2, 3] }, { q1: [1, 2, 3] }), false);
    });

    it('should return true for same array reference', () => {
      const sharedArray = [1, 2, 3];
      assert.strictEqual(checkStudentKnowledge({ q1: sharedArray }, { q1: sharedArray }), true);
    });

    it('should return false for equivalent nested objects with different references', () => {
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

    it('should return false when both answers are NaN', () => {
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

    it('should handle inherited property names as keys', () => {
      assert.strictEqual(checkStudentKnowledge({ toString: 'a', constructor: 'b' },
        { toString: 'a', constructor: 'b' }), true);
    });
  });
});
