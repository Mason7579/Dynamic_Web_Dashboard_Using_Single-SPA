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

connection.on('overviewData', (newData: environmentData) => {
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
  activeDrills: {
    value: 0,
    change: 0,
  },
  efficiency: {
    value: 0,
    change: 0,
  },
});
</script>

<template>
  <div
    class="flex flex-col bg-gray-100 border border-gray-200 dark:border-0 dark:bg-neutral-700 pb-1 rounded-md gap-2 items-center justify-around w-full"
  >
    <h1 class="self-center md:text-2xl text-base">Overview</h1>
    <div class="flex flex-row justify-around pb-2 w-full">
      <div class="items-center flex justify-center flex-col">
        <h2 class="text-base md:text-2xl self-center">Active Sites</h2>
        <h1
          :class="{
            'text-lg md:text-4xl': true,
            'self-center': true,
            'text-green-600': data.activeDrills.change > 0,
            'text-red-600': data.activeDrills.change < 0,
            'dark:text-white': data.activeDrills.change === 0,
          }"
        >
          {{ data.activeDrills.value }}
        </h1>
      </div>

      <div class="items-center flex justify-center flex-col">
        <h2 class="text-base md:text-2xl">Efficiency</h2>
        <h1
          :class="{
            'text-lg md:text-4xl': true,
            'text-green-600': data.efficiency.change > 0,
            'text-red-600': data.efficiency.change < 0,
            'dark:text-white': data.efficiency.change === 0,
          }"
        >
          {{ data.efficiency.value }}%
        </h1>
      </div>
    </div>
  </div>
</template>
