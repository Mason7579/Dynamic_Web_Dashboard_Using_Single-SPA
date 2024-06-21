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

connection.on('machineData', (newData: environmentData) => {
  //   console.log(newData);
  for (const key in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, key)) {
      const element = newData[key];

      data.value[key].change = element - data.value[key].value;
      data.value[key].value = element;
    }
  }
});

interface Data {
  [key: string]: {
    value: number;
    change: number;
  };
}

const data = ref<Data>({
  drillingSpeed: {
    value: 0,
    change: 0,
  },
  pressure: {
    value: 0,
    change: 0,
  },
  failures: {
    value: 0,
    change: 0,
  },
  fluidLevels: {
    value: 0,
    change: 0,
  },
});
</script>

<template>
  <div
    class="flex flex-col bg-gray-100 border border-gray-200 dark:border-0 dark:bg-neutral-700 md:p-4 rounded-md items-center justify-around w-full p-2"
  >
    <h1 class="self-center">Machine Status</h1>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Drilling Speed:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.drillingSpeed.change > 0,
            'text-red-600': data.drillingSpeed.change < 0,
            'dark:text-white': data.drillingSpeed.change === 0,
          }"
        >
          {{ data.drillingSpeed.value }}
        </h1>

        <h1>m/h</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Pressure:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.pressure.change > 0,
            'text-red-600': data.pressure.change < 0,
            'dark:text-white': data.pressure.change === 0,
          }"
        >
          {{ data.pressure.value }}
        </h1>
        <h1>Pa</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Failures:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.failures.change > 0,
            'text-red-600': data.failures.change < 0,
            'dark:text-white': data.failures.change === 0,
          }"
        >
          {{ data.failures.value }}
        </h1>
        <h1>Count</h1>
      </div>
    </div>
    <div class="flex flex-row gap-2 justify-between w-full">
      <h1 class="">Fluid Levels:</h1>
      <div class="flex gap-1">
        <h1
          :class="{
            'text-green-600': data.fluidLevels.change > 0,
            'text-red-600': data.fluidLevels.change < 0,
            'dark:text-white': data.fluidLevels.change === 0,
          }"
        >
          {{ data.fluidLevels.value }}
        </h1>
        <h1>L</h1>
      </div>
    </div>
  </div>
</template>
