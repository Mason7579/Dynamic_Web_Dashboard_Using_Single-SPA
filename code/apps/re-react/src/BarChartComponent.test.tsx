import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from './BarChartComponent';
import Chart from 'chart.js/auto';

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  })),
}));
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    fillRect: jest.fn(),
    drawImage: jest.fn(),
  });
});
beforeEach(() => {
  jest.clearAllMocks();
});
describe('BarChart Component', () => {
  it('creates a chart instance when canvas context is available', () => {
    // Ensure the mock returns a valid context
    const mockContext = {
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      canvas: {},
    };
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue(mockContext);

    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [1, 2, 3],
          backgroundColor: ['red', 'blue', 'green'],
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    render(<BarChart data={data} options={options} />);

    expect(Chart).toHaveBeenCalledTimes(1);
    expect(Chart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'bar',
        data: expect.anything(),
        options: expect.anything(),
      }),
    );
  });

  it('renders a canvas element', () => {
    const data = {
      labels: [],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };
    render(<BarChart data={data} />);

    const canvasElement = screen.getByTestId('bar-chart-canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  it('calls Chart.js with the correct parameters', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mockChartInstance = require('chart.js/auto').default;
    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [1, 2, 3],
          backgroundColor: ['red', 'blue', 'green'],
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    render(<BarChart data={data} options={options} />);

    expect(mockChartInstance).toHaveBeenCalledTimes(1);

    const chartConfig = mockChartInstance.mock.calls[0][1];
    expect(chartConfig).toEqual(
      expect.objectContaining({
        type: 'bar',
        data: expect.objectContaining({
          datasets: expect.arrayContaining([
            expect.objectContaining({
              backgroundColor: expect.arrayContaining(['red', 'blue', 'green']),
              data: expect.arrayContaining([1, 2, 3]),
              label: 'Dataset 1',
            }),
          ]),
          labels: expect.arrayContaining(['January', 'February', 'March']),
        }),
        options: expect.objectContaining({
          scales: expect.objectContaining({
            y: expect.objectContaining({
              beginAtZero: true,
            }),
          }),
        }),
      }),
    );
  });
});
