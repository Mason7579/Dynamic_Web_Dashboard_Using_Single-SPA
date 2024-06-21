import { getDateTime } from './getDateTime';
import '@testing-library/jest-dom';

describe('getDateTime function tests', () => {
  it('Expect it to return a datetime string', () => {
    const datetime = getDateTime();
    expect(typeof datetime).toBe('string');
  });
});
