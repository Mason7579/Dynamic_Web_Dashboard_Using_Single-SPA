<script lang="ts">
  import { onMount } from 'svelte';
  import { createChartOb } from './chart/chartRender';
  import * as signalR from '@microsoft/signalr';
  import type { Chart } from 'chart.js';
  import DropDown from './DropDown.svelte';
  import LiveIndicator from './LiveIndicator.svelte';
  import { getApiUrl } from './getApiUrl';

  let chartDom: HTMLCanvasElement;
  let chartCtx: Chart | undefined;
  let signalRConnection = 'Disconnected';
  let liveView = true;

  $: if (liveView) {
    handleLiveChart();
  }

  const apiUrl = getApiUrl();
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(apiUrl, {
      withCredentials: false,
    })
    .build();

  const dataset: { x: number; y: number }[] = [];

  async function connectSignalR() {
    try {
      await connection.start();
      signalRConnection = 'Live';
    } catch (err) {
      signalRConnection = 'Disconnected';
    }
  }

  connection.onclose(() => {
    signalRConnection = 'Disconnected';
    liveView = false;
  });

  connection.on(
    'wellInfoData',
    ({ gallons, timestamp }: { gallons: number; timestamp: number }) => {
      chartCtx?.data.datasets[0].data.push({ x: timestamp, y: gallons });
      chartCtx?.update();

      if (liveView) {
        moveChartViewPort();
      }

      // Send data to the status bar
      const detail = {
        widgetId: 1,
        data: {
          gallons,
          timestamp
        }
      };
      const dataUpdatedEvent = new CustomEvent('DataUpdated', { detail: detail });
      window.dispatchEvent(dataUpdatedEvent);
    },
  );

  function handleLiveChart() {
    if (liveView && dataset.length > 0) {
      moveChartViewPort();
    }
  }

  function moveChartViewPort() {
    if (chartCtx) {
      const numPointsToShow = 10;
      const startIndex = Math.max(0, dataset.length - numPointsToShow);
      const endIndex = dataset.length - 1;

      if (chartCtx.options.scales && chartCtx.options.scales.x) {
        chartCtx.options.scales.x.min = dataset[startIndex]?.x || 0;
        chartCtx.options.scales.x.max = dataset[endIndex]?.x || 0;

        chartCtx.update();
      }
    }
  }

  const unloadEvent = new Event('unloadOilWellChartSvelte');

  function unloadWidget() {
    window.dispatchEvent(unloadEvent);
  }

  onMount(() => {
    if (chartDom) {
      chartCtx = createChartOb({
        canvas: chartDom,
        chartType: 'line',
        dataset: dataset,
      });
    }

    chartDom.addEventListener('wheel', () => {
      liveView = false;
    });

    connectSignalR();
  });
</script>

<div
  class="dark:text-[#E2EFEF] bg-white dark:bg-[#2D2D2D] rounded-xl flex flex-col w-full h-full pb-10"
  id="maindiv"
>
  <!-- TITLE -->
  <div class="bg-white dark:bg-[#2D2D2D] flex flex-row justify-between p-2 rounded-t-xl px-5">
    <h1 class="text-lg font-bold">Oil Well Chart</h1>
    <button class="" on:click={unloadWidget} data-testid="unload-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  </div>

  <!-- BODY -->
  <div class="px-6 flex flex-col w-full h-full relative">
    <div class="pt-5 justify-between w-full flex px-2">
      <LiveIndicator bind:signalRConnection bind:liveView />
      <DropDown bind:liveData={liveView} />
    </div>
    <div class="relative w-full h-full">
      <canvas bind:this={chartDom}> </canvas>
    </div>
  </div>
</div>

<style>
  :root {
    --range-handle: rgb(59 130 246);
    --range-handle-focus: rgb(77, 142, 247);
  }
</style>