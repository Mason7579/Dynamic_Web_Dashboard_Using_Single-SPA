<script lang="ts">
  import * as signalR from '@microsoft/signalr';
  import UpArrow from './components/UpArrow.svelte';
  import DownArrow from './components/DownArrow.svelte';
  import {
    WindowEvents,
    WindowEventService,
    type IStatusBarEvent,
  } from './utils/StatusBarEventService';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  // Environments
  export function getApiUrl(): string {
    if (import.meta.env.MODE === 'production') {
      return import.meta.env.VITE_API_URL_PROD;
    } else {
      return import.meta.env.VITE_API_URL_DEV;
    }
  }
  
  // SignalR
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(getApiUrl())
    .build();

  let safetyIndexData = { count: 0, isUp: false };
  let weeklyAvgData = { count: 0 };
  let environmentQuality = { count: 0 };
  let totalEmployees = { count: 0 };
  let rigsCritical = { count: 1 };
  let drillingRate = { count: 0 };

  connection.on("ReceiveRandomNumber", (statusData) => {
      safetyIndexData = { count: statusData.safetyIndex, isUp: statusData.safetyIndexUp };
  });

  const getIcon = (isUp: boolean) => {
    return isUp ? UpArrow : DownArrow;
  }
  
  connection.start().catch(err => console.error("SignalR Connection Error: ", err));

  // Status bar updating as MFEs un/load and data changes
  window.addEventListener('DataUpdated', (event: Event) => {
    const customEvent = event as CustomEvent<{
      widgetId: number,
      data: any
    }>;

    const { widgetId, data } = customEvent.detail;

    switch (widgetId) {
      case 1:
        const { gallons } = data;
        weeklyAvgData.count = gallons;
        break;
      case 2:
        const { temperature, noiseLevel, co2Level, airQuality } = data;
        environmentQuality.count = Math.round(100 * (1 - (temperature - 72) / 32 - noiseLevel / 100 - airQuality / 300 - (co2Level - 400) / 1600));
        break;
      case 3:
        const { employees } = data;
        totalEmployees.count = employees.length;
        break;
      case 4:
        const { message } = data;
        if (message.status === 'Rig is in critical condition') {
          rigsCritical.count += 1
        }
        break;
      case 5:
        const { rate } = data;
        drillingRate.count = rate;
        break;
      // Additional cases for other widgets
    }
  });
  
  $: metricsList = [
    { widget: 1, label: 'Weekly Avg', value: weeklyAvgData.count, unit: 'gal/hr'},
    { widget: 2, label: 'Environmental Quality', value: environmentQuality.count, unit: '/100'},
    { widget: 3, label: 'Total Employees', value: totalEmployees.count, unit: ''},
    { widget: 4, label: 'Rigs Critical', value: rigsCritical.count, unit: ''},
    { widget: 5, label: 'Current Drilling Rate', value: drillingRate.count, unit: 'm/s'},
  ];

  let loadedWidgets = writable(new Set());
  let widgetIds = [];

  $: displayedMetrics = metricsList.filter(metric =>
    $loadedWidgets.has(metric.widget));

  const loadWidget = (widgetId: number) => {
    loadedWidgets.update(currentSet => {
      const newSet = new Set(currentSet);
      newSet.add(widgetId);
      return newSet;
    });
  }

  const unloadWidget = (widgetId: number) => {
    loadedWidgets.update(currentSet => {
      const newSet = new Set(currentSet);
      newSet.delete(widgetId);
      return newSet;
    });
  }

  const clearWidgets = () => {
    loadedWidgets.update(() => {
      const newSet = new Set();
      return newSet;
    });
  }

  const StatusBarDefaultValue: IStatusBarEvent = {
    widget: -1,
    status: 'clear',
  };

  const statusbar = writable<IStatusBarEvent>(StatusBarDefaultValue);
    
  const updateStatusBar = (event: Event) => {
    const { detail } = event as CustomEvent<IStatusBarEvent>;

    statusbar.update(currentStatusBar => {
      return {...currentStatusBar, ...detail};
    })
    
    if (detail.status === 'load') {
      loadWidget(detail.widget);
    }
    else if (detail.status === 'unload') {
      unloadWidget(detail.widget);
    }
    else if (detail.status === 'clear') {
      clearWidgets();
    }
  };

  onMount(() => {
    WindowEventService.subscribe(WindowEvents.STATUSBAR, updateStatusBar);

    const layoutType = window.location.pathname.split('/')[1] || 'static';
    const key = `components-${layoutType}`;
    const storedWidgets = localStorage.getItem(key);
    if (storedWidgets) {
      const widgets = JSON.parse(storedWidgets);
      widgetIds = widgets.map((widget: any) => widget.id);
      loadedWidgets.set(new Set(widgetIds));
    }

    return () => {
      WindowEventService.unsubscribe(WindowEvents.STATUSBAR, updateStatusBar);
    };
  });
</script>

<main class="bg-gray-100 dark:bg-[#444444] px-4 dark:text-white">
  <div class="flex space-x-4 text-lg overflow-x-auto whitespace-nowrap pb-4">
    <span class="inline-flex">
      <p class="px-2">Safety Performance Index: {safetyIndexData.count}</p>
      <svelte:component this={getIcon(safetyIndexData.isUp)} />
    </span>
    {#each displayedMetrics as metric}
      <span class="inline-flex">
        <p class="px-2">{metric.label}: {metric.value} {metric.unit}</p>
      </span>
    {/each}
    </div>
</main>