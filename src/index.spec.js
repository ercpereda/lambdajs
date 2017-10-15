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
