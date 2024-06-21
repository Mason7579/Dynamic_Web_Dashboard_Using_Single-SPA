import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyWidget from './EmptyWidget';

test('renders correctly', () => {
  const mockOnSelection = jest.fn();

  render(<EmptyWidget onSelection={mockOnSelection} />);

  const button = screen.getByLabelText('hs-dropdown-default');
  expect(button).toBeInTheDocument();
});

test('calls onSelection with loadApp when first item is clicked', () => {
  const mockOnSelection = jest.fn();
  render(<EmptyWidget onSelection={mockOnSelection} />);

  const firstItem = screen.getByText('WellInfoChartSvelte');
  fireEvent.click(firstItem);

  expect(mockOnSelection).toHaveBeenCalledWith('loadApp');
});

test('calls onSelection with loadApp2 when second item is clicked', () => {
  const mockOnSelection = jest.fn();
  render(<EmptyWidget onSelection={mockOnSelection} />);

  const secondItem = screen.getByText('TableAngular');
  fireEvent.click(secondItem);

  expect(mockOnSelection).toHaveBeenCalledWith('loadApp2');
});

test('calls onSelection with loadApp3 when third item is clicked', () => {
  const mockOnSelection = jest.fn();
  render(<EmptyWidget onSelection={mockOnSelection} />);

  const thirdItem = screen.getByText('RigInfoVue');
  fireEvent.click(thirdItem);

  expect(mockOnSelection).toHaveBeenCalledWith('loadApp3');
});

test('calls onSelection with loadApp4 when fourth item is clicked', () => {
  const mockOnSelection = jest.fn();
  render(<EmptyWidget onSelection={mockOnSelection} />);

  const fourthItem = screen.getByText('MessagesReact');
  fireEvent.click(fourthItem);

  expect(mockOnSelection).toHaveBeenCalledWith('loadApp4');
});
