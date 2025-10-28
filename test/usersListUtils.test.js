import { expect } from 'chai';
import { filterUsersByAge, sortUsersByName, findUserById, isEmailTaken } from '../utils/usersListUtils.js';

describe('Users List Utils', () => {
  const sampleUsers = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    { id: 4, name: 'Diana', age: 28, email: 'diana@example.com' },
    { id: 5, name: 'Eve', age: 22, email: 'eve@example.com' },
  ];

  describe('filterUsersByAge', () => {
    it('should filter users by age range', () => {
      const result = filterUsersByAge(sampleUsers, 25, 30);
      expect(result).to.have.lengthOf(3);
      expect(result.map(u => u.name)).to.include.members(['Alice', 'Bob', 'Diana']);
    });

    it('should return empty array when no users match age range', () => {
      const result = filterUsersByAge(sampleUsers, 40, 50);
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should include users at boundary ages', () => {
      const result = filterUsersByAge(sampleUsers, 25, 25);
      expect(result).to.have.lengthOf(1);
      expect(result[0].name).to.equal('Alice');
    });

    it('should handle single user matching criteria', () => {
      const result = filterUsersByAge(sampleUsers, 35, 35);
      expect(result).to.have.lengthOf(1);
      expect(result[0].name).to.equal('Charlie');
    });

    it('should handle all users matching criteria', () => {
      const result = filterUsersByAge(sampleUsers, 20, 40);
      expect(result).to.have.lengthOf(5);
      expect(result).to.deep.equal(sampleUsers);
    });

    it('should handle empty users array', () => {
      const result = filterUsersByAge([], 25, 30);
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should throw an error for non-array input', () => {
      expect(() => filterUsersByAge('not an array', 25, 30)).to.throw('Users must be an array');
      expect(() => filterUsersByAge(null, 25, 30)).to.throw('Users must be an array');
      expect(() => filterUsersByAge(undefined, 25, 30)).to.throw('Users must be an array');
      expect(() => filterUsersByAge({}, 25, 30)).to.throw('Users must be an array');
    });
  });

  describe('sortUsersByName', () => {
    it('should sort users by name alphabetically', () => {
      const result = sortUsersByName(sampleUsers);
      expect(result).to.have.lengthOf(5);
      expect(result[0].name).to.equal('Alice');
      expect(result[1].name).to.equal('Bob');
      expect(result[2].name).to.equal('Charlie');
      expect(result[3].name).to.equal('Diana');
      expect(result[4].name).to.equal('Eve');
    });

    it('should not modify the original array', () => {
      const originalUsers = [...sampleUsers];
      sortUsersByName(sampleUsers);
      expect(sampleUsers).to.deep.equal(originalUsers);
    });

    it('should handle users with same names', () => {
      const usersWithDuplicates = [
        { id: 1, name: 'Alice', age: 25, email: 'alice1@example.com' },
        { id: 2, name: 'Alice', age: 30, email: 'alice2@example.com' },
        { id: 3, name: 'Bob', age: 35, email: 'bob@example.com' },
      ];
      const result = sortUsersByName(usersWithDuplicates);
      expect(result[0].name).to.equal('Alice');
      expect(result[1].name).to.equal('Alice');
      expect(result[2].name).to.equal('Bob');
    });

    it('should handle case-sensitive sorting', () => {
      const usersWithCase = [
        { id: 1, name: 'alice', age: 25, email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
        { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
      ];
      const result = sortUsersByName(usersWithCase);
      expect(result[0].name).to.equal('alice'); // 'a' comes before 'B' in ASCII
      expect(result[1].name).to.equal('Bob');
      expect(result[2].name).to.equal('Charlie');
    });

    it('should handle empty users array', () => {
      const result = sortUsersByName([]);
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should handle single user', () => {
      const singleUser = [{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }];
      const result = sortUsersByName(singleUser);
      expect(result).to.deep.equal(singleUser);
    });

    it('should throw an error for non-array input', () => {
      expect(() => sortUsersByName('not an array')).to.throw('Users must be an array');
      expect(() => sortUsersByName(null)).to.throw('Users must be an array');
      expect(() => sortUsersByName(undefined)).to.throw('Users must be an array');
      expect(() => sortUsersByName({})).to.throw('Users must be an array');
    });
  });

  describe('findUserById', () => {
    it('should find user by existing ID', () => {
      const result = findUserById(sampleUsers, 3);
      expect(result).to.not.be.null;
      expect(result.id).to.equal(3);
      expect(result.name).to.equal('Charlie');
    });

    it('should return null for non-existing ID', () => {
      const result = findUserById(sampleUsers, 999);
      expect(result).to.be.null;
    });

    it('should find user with ID 0', () => {
      const usersWithZeroId = [
        { id: 0, name: 'Zero', age: 25, email: 'zero@example.com' },
        { id: 1, name: 'One', age: 30, email: 'one@example.com' },
      ];
      const result = findUserById(usersWithZeroId, 0);
      expect(result).to.not.be.null;
      expect(result.id).to.equal(0);
      expect(result.name).to.equal('Zero');
    });

    it('should find user with negative ID', () => {
      const usersWithNegativeId = [
        { id: -1, name: 'Negative', age: 25, email: 'negative@example.com' },
        { id: 1, name: 'Positive', age: 30, email: 'positive@example.com' },
      ];
      const result = findUserById(usersWithNegativeId, -1);
      expect(result).to.not.be.null;
      expect(result.id).to.equal(-1);
      expect(result.name).to.equal('Negative');
    });

    it('should handle empty users array', () => {
      const result = findUserById([], 1);
      expect(result).to.be.null;
    });

    it('should throw an error for non-array input', () => {
      expect(() => findUserById('not an array', 1)).to.throw('Users must be an array');
      expect(() => findUserById(null, 1)).to.throw('Users must be an array');
      expect(() => findUserById(undefined, 1)).to.throw('Users must be an array');
      expect(() => findUserById({}, 1)).to.throw('Users must be an array');
    });
  });

  describe('isEmailTaken', () => {
    it('should return true for existing email', () => {
      expect(isEmailTaken(sampleUsers, 'alice@example.com')).to.be.true;
      expect(isEmailTaken(sampleUsers, 'bob@example.com')).to.be.true;
      expect(isEmailTaken(sampleUsers, 'charlie@example.com')).to.be.true;
    });

    it('should return false for non-existing email', () => {
      expect(isEmailTaken(sampleUsers, 'nonexistent@example.com')).to.be.false;
      expect(isEmailTaken(sampleUsers, 'test@test.com')).to.be.false;
    });

    it('should be case-sensitive', () => {
      expect(isEmailTaken(sampleUsers, 'ALICE@EXAMPLE.COM')).to.be.false;
      expect(isEmailTaken(sampleUsers, 'Alice@Example.com')).to.be.false;
    });

    it('should handle empty string email', () => {
      expect(isEmailTaken(sampleUsers, '')).to.be.false;
    });

    it('should handle special characters in email', () => {
      const usersWithSpecialEmail = [
        { id: 1, name: 'Test', age: 25, email: 'test+tag@example.com' },
        { id: 2, name: 'Test2', age: 30, email: 'test.user@example.com' },
      ];
      expect(isEmailTaken(usersWithSpecialEmail, 'test+tag@example.com')).to.be.true;
      expect(isEmailTaken(usersWithSpecialEmail, 'test.user@example.com')).to.be.true;
      expect(isEmailTaken(usersWithSpecialEmail, 'test@example.com')).to.be.false;
    });

    it('should handle empty users array', () => {
      expect(isEmailTaken([], 'any@example.com')).to.be.false;
    });

    it('should throw an error for non-array input', () => {
      expect(() => isEmailTaken('not an array', 'test@example.com')).to.throw('Users must be an array');
      expect(() => isEmailTaken(null, 'test@example.com')).to.throw('Users must be an array');
      expect(() => isEmailTaken(undefined, 'test@example.com')).to.throw('Users must be an array');
      expect(() => isEmailTaken({}, 'test@example.com')).to.throw('Users must be an array');
    });
  });
});
