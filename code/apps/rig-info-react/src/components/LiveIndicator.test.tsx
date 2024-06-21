import { render } from '@testing-library/react';
import React from 'react';
import LiveIndicator from './LiveIndicator';
import '@testing-library/jest-dom';

describe('LiveIndicator component tests', () => {
  test('renders Live Indicator component based on connection status', () => {
    const { container } = render(<LiveIndicator isLive={true} />);
    expect(container).toHaveTextContent('Live');

    const { container: container2 } = render(<LiveIndicator isLive={false} />);
    expect(container2).toHaveTextContent('Offline');
  });
});
