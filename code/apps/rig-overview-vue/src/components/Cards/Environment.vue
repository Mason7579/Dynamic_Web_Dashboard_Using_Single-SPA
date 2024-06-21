<script setup lang="ts">
import { ref } from 'vue';
import { HubConnection } from '@microsoft/signalr';

interface EnvironmentProps {
  connection: HubConnection;
}

const { connection } = defineProps<EnvironmentProps>();

interface environmentData {
  [key: string]: number;
}

connection.on('environmentData', (newData: environmentData) => {
  // console.log(newData);
  for (const key in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, key)) {
      const element = newData[key];

      data.value[key].change = element - data.value[key].value;
      data.value[key].value = element;
    }
  }

  // Send data to the status bar
  const detail = {
    widgetId: 2,
    data: {
      temperature: newData.temperature,
      noiseLevel: newData.noiseLevel,
      co2Level: newData.co2Level,
      airQuality: newData.airQuality,
    },
  };
  const dataUpdatedEvent = new CustomEvent('DataUpdated', { detail: detail });
  window.dispatchEvent(dataUpdatedEvent);
});

interface Data {
  [key: string]: {
    value: number;
    change: number;
  };
}

const data = ref<Data>({
  temperature: {
    value: 0,
    change: 0,
  },
  noiseLevel: {
    value: 0,
    change: 0,
  },
  airQuality: {
    value: 0,
    change: 0,
  },
  co2Level: {
    value: 0,
    change: 0,
  },
});
</script>

<template>
  <div
    class="flex flex-col bg-gray-100 border border-gray-200 dark:border-0 dark:bg-neutral-700 md:p-4 rounded-md items-center justify-around w-full p-2"
  >
    <h1 class="self-center">Environment</h1>
    <div class="flex flex-row justify-between w-full">
      <h1 class="">Temperature:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.temperature.change > 0,
            'text-red-600': data.temperature.change < 0,
            'dark:text-white': data.temperature.change === 0,
          }"
        >
          {{ data.temperature.value }}
        </h1>

        <h1>F</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Noise Level:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.noiseLevel.change > 0,
            'text-red-600': data.noiseLevel.change < 0,
            'dark:text-white': data.noiseLevel.change === 0,
          }"
        >
          {{ data.noiseLevel.value }}
        </h1>
        <h1>dB</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Air Quality:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.airQuality.change > 0,
            'text-red-600': data.airQuality.change < 0,
            'dark:text-white': data.airQuality.change === 0,
          }"
        >
          {{ data.airQuality.value }}
        </h1>
        <h1>AQI</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">CO2 Level:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.co2Level.change > 0,
            'text-red-600': data.co2Level.change < 0,
            'dark:text-white': data.co2Level.change === 0,
          }"
        >
          {{ data.co2Level.value }}
        </h1>
        <h1>ppm</h1>
      </div>
    </div>
  </div>
</template>
