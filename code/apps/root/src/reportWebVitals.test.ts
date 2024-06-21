import '@testing-library/jest-dom';
import reportWebVitals from './reportWebVitals';

test('reportWebVitals runs', () => {
  expect(
    reportWebVitals(function () {
      console.log();
    }),
  ).not.toBeUndefined;
});

test('reportWebVitals runs when no argument passed', () => {
  expect(reportWebVitals()).not.toBeUndefined;
});
