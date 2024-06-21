import { getLocalComponents, getLocalLayout } from './getLocalStorage';

it('should have an item that would throw the json parse', () => {
  localStorage.setItem('fakeLayout', '');
  const layout = getLocalLayout('fakeLayout');

  expect(layout).toBe('?cols=2,2');
});

it('should have an empty url', () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/not',
      search: '',
    },
    writable: true,
  });
  localStorage.setItem('fakeLayout', '');
  const layout = getLocalLayout('fakeLayout');

  expect(layout).toBe('?cols=1');
});

it('should throw an error because an array is not there', () => {
  localStorage.setItem('fakeComps', '');

  const comps = getLocalComponents('fakeComps');
  expect(comps).toStrictEqual([]);
});
