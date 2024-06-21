import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';

interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const mergedOptions = {
      responsive: true,
      maintainAspectRatio: false,
      ...options,
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data,
      options: mergedOptions,
    });
    return () => chart.destroy();
  }, [data, options]);

  return (
    <canvas
      ref={chartRef}
      data-testid="bar-chart-canvas"
      className="dark:text-white"
    />
  );
};

export default BarChart;
