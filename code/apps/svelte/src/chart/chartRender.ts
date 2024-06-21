import type { ChartTypeRegistry } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import zoomPlugin from 'chartjs-plugin-zoom';
import { zoomTimeChartOpts } from './chartMeta';

Chart.register(zoomPlugin);

export function createChartOb({
  canvas,
  chartType,
  dataset,
}: {
  canvas: HTMLCanvasElement;
  chartType: keyof ChartTypeRegistry;
  dataset: { x: number; y: number }[];
}) {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const chart = new Chart(ctx, {
      options: zoomTimeChartOpts,
      data: {
        datasets: [
          {
            showLine: true,
            label: 'Site A Efficiency',
            data: dataset,
            borderColor: 'rgb(59 130 246)',
            backgroundColor: 'rgb(59 130 246)',
            pointBackgroundColor: 'rgb(255 255 255)',
            fill: false,
          },
        ],
      },
      type: chartType,
    });

    return chart;
  }
}
