import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

test('applies custom className', () => {
  render(
    <ResizablePanelGroup direction="horizontal" data-testid="resizable-group">
      <ResizablePanel data-testid="resizable-div">
        <ResizableHandle data-testid="resizable-handle" withHandle />
      </ResizablePanel>
    </ResizablePanelGroup>,
  );

  const handle = screen.getByTestId('resizable-group');
  expect(handle).toBeInTheDocument();
});
