import {expect} from 'chai';
import l from './index';

const emptyArray = [];
const array1 = [1, 2, 3, 4, 5, 6];

describe('head', () => {
  it('should return the first element of the array', () => {
    expect(l.head(array1)).to.equal(1);
  });

  it('should return `undefined` if the array is empty', () => {
    expect(l.head(emptyArray)).to.be.undefined;
  });
});

describe('tail', () => {
  it('should returns all but the first item of the array', () => {
    expect(l.tail(array1)).to.deep.equal([2, 3, 4, 5, 6]);
  });

  it('should returns an empty array if the array is empty', () => {
    expect(l.tail(emptyArray)).to.be.an('array').that.is.empty;
  });
});

describe('def', () => {
  it('should returns true if the argument is defined', () => {
    const x = 'hello world';

    expect(l.def(x)).to.be.true;
  });

  it('should returns false if the argument is undefined', () => {
    let x;

    expect(l.def(x)).to.be.false;
  });
});

describe('undef', () => {
  it('should returns true if the argument is undefined', () => {
    let x;

    expect(l.undef(x)).to.be.true;
  });

  it('should returns false if the argument is defined', () => {
    const x = 'hello world';

    expect(l.undef(x)).to.be.false;
  });
});

describe('copy', () => {
  it('should returns a array with the same elements', () => {
    expect(l.copy(array1)).to.deep.equal(array1);
  });

  it('should returns a new array', () => {
    expect(l.copy(array1)).to.not.equal(array1);
  });
});

describe('length', () => {
  it('should returns the number of elements of the array', () => {
    expect(l.length(array1)).to.equal(6);
  });

  it('should returs 0 for an empty array', () => {
    expect(l.length(emptyArray)).to.equal(0);
  });
});

describe('reverse', () => {
  it('should returns the reverse of the array', () => {
    expect(l.reverse(array1)).to.deep.equal([6, 5, 4, 3, 2, 1]);
  });

  it('should returns an empty array for an empty array', () => {
    expect(l.reverse(emptyArray)).to.be.an('array').that.is.empty;
  });
});

describe('first', () => {
  it('should returns an array with the first element', () => {
    expect(l.first(array1)).to.deep.equal([1]);
  });

  it('should returns an array with the 2 first elements if n=2', () => {
    expect(l.first(array1, 2)).to.deep.equal([1, 2]);
  });

  it('should returns the hole array if n is largest that the length', () => {
    expect(l.first(array1, 1000)).to.deep.equal(array1);
  });

  it('should returns an empty array if n is 0', () => {
    expect(l.first(array1, 0)).to.be.an('array').that.is.empty;
  });

  it('should returns an empty array if n < 0', () => {
    expect(l.first(array1, -1)).to.be.an('array').that.is.empty;
  });
});

describe('last', () => {
  it('should returns an array with the last element', () => {
    expect(l.last(array1)).to.deep.equal([6]);
  });

  it('should returns an array with the 2 last elements if n=2', () => {
    expect(l.last(array1, 2)).to.deep.equal([5, 6]);
  });

  it('should returns the hole array if n is largest that the length', () => {
    expect(l.last(array1, 1000)).to.deep.equal(array1);
  });

  it('should returns an empty array if n is 0', () => {
    expect(l.last(array1, 0)).to.be.an('array').that.is.empty;
  });

  it('should returns an empty array if n < 0', () => {
    expect(l.last(array1, -1)).to.be.an('array').that.is.empty;
  });
});
