import type { ChartOptions } from 'chart.js';
import { enUS } from 'date-fns/locale';

export const zoomTimeChartOpts: ChartOptions = {
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },

      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: false,
        },
        drag: {
          enabled: true,
          modifierKey: 'ctrl',
        },

        mode: 'x',
      },
    },
  },

  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  hover: {
    mode: 'nearest',
    intersect: true,
  },

  scales: {
    y: {
      title: {
        display: true,
        font: {
          // TODO: make size dynamic
          size: 15,
        },
        text: 'Gallons',
      },
      stacked: true,
    },
    x: {
      type: 'time',

      adapters: {
        date: {
          locale: enUS,
        },
      },

      ticks: {
        stepSize: 5,
        maxTicksLimit: 5,
        autoSkip: true,
      },
    },
  },
};
