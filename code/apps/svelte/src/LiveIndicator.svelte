<script lang="ts">
  export let signalRConnection = "Disconnected";
  export let liveView = true;
</script>

{#if signalRConnection === "Live"}
  {#if liveView}
    <div class="flex items-center justify-center" data-testid="LiveViewIsTrue">
      <div class="flex items-center justify-center p-2">
        <div class="rounded-full bg-green-400 opacity-75 w-2 h-2"></div>
        <div
          class="animate-ping absolute rounded-full bg-green-400 opacity-75 w-2 h-2"
        ></div>
      </div>
      <p class="text-center text-green-400">Live</p>
    </div>
  {:else}
    <div
      class="flex items-center justify-center"
      data-test-id="LiveViewIsFalse"
    >
      <div class="flex items-center justify-center p-2">
        <div class="rounded-full bg-yellow-400 opacity-75 w-2 h-2"></div>
        <div
          class="absolute rounded-full bg-yellow-400 opacity-75 w-2 h-2"
        ></div>
      </div>
      <p class="text-center text-yellow-400">Paused Live View</p>
    </div>
  {/if}
{:else if signalRConnection === "Disconnected"}
  <div class="flex items-center justify-center" data-test-id="ServerFail">
    <div class="flex items-center justify-center p-2">
      <div class="rounded-full bg-red-400 opacity-75 w-2 h-2"></div>
      <div class="absolute rounded-full bg-red-400 opacity-75 w-2 h-2"></div>
    </div>
    <p class="text-center text-red-400">Disconnected</p>
  </div>
{/if}
