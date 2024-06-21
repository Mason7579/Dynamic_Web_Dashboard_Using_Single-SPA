import { getColsRows } from './getColsRows';

describe('getColsRows', () => {
  it('should return the correct layout', () => {
    const url = '?cols=2,1&w=1,2,3';
    const expectedLayout = [[1, 2], [3]];

    const result = getColsRows(url);

    expect(result).toEqual(expectedLayout);
  });

  it('should handle missing query parameters', () => {
    const url = '';
    const expectedLayout = [[0]];

    const result = getColsRows(url);

    expect(result).toEqual(expectedLayout);
  });

  it('should handle exceeding maximum columns and rows', () => {
    const url = 'cols=3,3,3&w=1,2,3,4,5,6,7,8,9,10,11,12';
    const expectedLayout = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = getColsRows(url);

    expect(result).toEqual(expectedLayout);
  });
});
