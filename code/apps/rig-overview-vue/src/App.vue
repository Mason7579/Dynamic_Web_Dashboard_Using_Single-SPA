<script setup lang="ts">
import { HubConnectionBuilder } from '@microsoft/signalr';
import Environment from './components/Cards/Environment.vue';
import Machine from './components/Cards/Machine.vue';
import OverView from './components/Cards/RigOutput.vue';
import { ref } from 'vue';
import { getApiUrl } from './getApiUrl';

const connection = new HubConnectionBuilder()
  .withUrl(getApiUrl(), {
    withCredentials: false,
  })
  .build();

const startSignalRConnection = ref(false);

async function connectSignalR() {
  try {
    await connection.start();
    startSignalRConnection.value = true;
  } catch (err) {
    startSignalRConnection.value = false;
  }
}

connection.onclose(() => {
  startSignalRConnection.value = false;
});

connectSignalR();

const handleReloadIconAnimation = ref(false);

function handleReloadConnection() {
  handleReloadIconAnimation.value = true;
  connectSignalR();
  setTimeout(() => {
    handleReloadIconAnimation.value = false;
  }, 1000);
}

const unloadEvent = new Event('unloadRigInfoVue');

function unloadWidget() {
  window.dispatchEvent(unloadEvent);
}
</script>

<template>
  <div
    class="flex flex-col dark:text-[#E2EFEF] bg-white dark:bg-[#2D2D2D] rounded-xl h-full w-full"
  >
    <!-- TITLE -->
    <div
      class="bg-white dark:bg-[#2D2D2D] flex flex-row justify-between md:p-2 md:px-5 rounded-t-xl text-lg px-4 py-1"
    >
      <h1 class="font-bold">Rig Status</h1>

      <div class="flex flex-row items-center gap-2 justify-center">
        <button
          data-testid="reload-connection"
          @click="handleReloadConnection"
          :disabled="startSignalRConnection"
        >
          <div
            :class="{
              'animate-oneroa': handleReloadIconAnimation,
            }"
            data-testid="reload-connection-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="md:w-6 md:h-6 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </button>

        <h1 class="text-green-600" v-if="startSignalRConnection === true">
          Connected
        </h1>
        <h1 class="text-red-600" v-if="startSignalRConnection === false">
          Disconnected
        </h1>

        <button class="" @click="unloadWidget" data-testid="unload-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="md:w-6 md:h-6 h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- BODY -->
    <div class="flex flex-col p-2 w-full h-full md:text-lg text-sm">
      <div class="flex flex-row gap-2 md:gap-4 p-1 md:p-2 w-full h-full">
        <Environment :connection="connection" />
        <Machine :connection="connection" />
      </div>
      <div class="flex flex-row md:gap-2 p-1 md:p-2 w-full h-full">
        <OverView :connection="connection" />
      </div>
    </div>
  </div>
</template>

<style>
.single-spa-container {
  height: 100%;
  width: 100%;
}
</style>
