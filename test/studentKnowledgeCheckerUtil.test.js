import { expect } from 'chai';
import { checkStudentKnowledge } from '../utils/studentKnowledgeCheckerUtil.js';

describe('Student Knowledge Checker Util', () => {
  describe('checkStudentKnowledge', () => {
    it('should return true when all answers are correct', () => {
      const studentAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      const correctAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;
    });

    it('should return false when at least one answer is incorrect', () => {
      const studentAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      const correctAnswers = { q1: 'a', q2: 'b', q3: 'd' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it('should return false when student has fewer answers', () => {
      const studentAnswers = { q1: 'a', q2: 'b' };
      const correctAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it('should return false when student has more answers', () => {
      const studentAnswers = { q1: 'a', q2: 'b', q3: 'c', q4: 'd' };
      const correctAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it('should return false when question keys are in different order', () => {
      const studentAnswers = { q1: 'a', q2: 'b', q3: 'c' };
      const correctAnswers = { q2: 'b', q1: 'a', q3: 'c' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it('should handle empty answer objects', () => {
      const studentAnswers = {};
      const correctAnswers = {};
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;
    });

    it('should handle single question', () => {
      const studentAnswers = { q1: 'correct' };
      const correctAnswers = { q1: 'correct' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      const studentAnswersWrong = { q1: 'wrong' };
      expect(checkStudentKnowledge(studentAnswersWrong, correctAnswers)).to.be.false;
    });

    it('should handle numeric answers', () => {
      const studentAnswers = { q1: 42, q2: 3.14, q3: 0 };
      const correctAnswers = { q1: 42, q2: 3.14, q3: 0 };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      const studentAnswersWrong = { q1: 42, q2: 3.14, q3: 1 };
      expect(checkStudentKnowledge(studentAnswersWrong, correctAnswers)).to.be.false;
    });

    it('should handle boolean answers', () => {
      const studentAnswers = { q1: true, q2: false };
      const correctAnswers = { q1: true, q2: false };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      const studentAnswersWrong = { q1: true, q2: true };
      expect(checkStudentKnowledge(studentAnswersWrong, correctAnswers)).to.be.false;
    });

    it('should handle mixed data types', () => {
      const studentAnswers = { q1: 'text', q2: 42, q3: true, q4: null };
      const correctAnswers = { q1: 'text', q2: 42, q3: true, q4: null };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      const studentAnswersWrong = { q1: 'text', q2: 42, q3: true, q4: undefined };
      expect(checkStudentKnowledge(studentAnswersWrong, correctAnswers)).to.be.false;
    });

    it('should handle case-sensitive string answers', () => {
      const studentAnswers = { q1: 'Hello', q2: 'World' };
      const correctAnswers = { q1: 'hello', q2: 'world' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it('should handle special characters in answers', () => {
      const studentAnswers = { q1: 'a@b#c$', q2: '!@#$%' };
      const correctAnswers = { q1: 'a@b#c$', q2: '!@#$%' };
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      const studentAnswersWrong = { q1: 'a@b#c$', q2: '!@#$%^' };
      expect(checkStudentKnowledge(studentAnswersWrong, correctAnswers)).to.be.false;
    });

    it('should handle large number of questions', () => {
      const studentAnswers = {};
      const correctAnswers = {};

      for (let i = 1; i <= 100; i++) {
        studentAnswers[`q${i}`] = `answer${i}`;
        correctAnswers[`q${i}`] = `answer${i}`;
      }

      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;

      // Change one answer
      studentAnswers.q50 = 'wrong';
      expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });
  });
});
