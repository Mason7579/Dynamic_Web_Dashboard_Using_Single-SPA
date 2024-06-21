import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorComponent } from './Error';

it('renders correctly', () => {
  render(<ErrorComponent />);
});
