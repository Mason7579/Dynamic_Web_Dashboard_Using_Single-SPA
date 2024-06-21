import { getWidgetsFromUrl } from './getWidgetsFromUrl';

it('should test it with a widget number that does not exist', () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/resizable',
      search: '?cols=2,2&w=1234',
    },
    writable: true,
  });

  const compsArr = getWidgetsFromUrl();

  expect(compsArr).toStrictEqual([]);
});
