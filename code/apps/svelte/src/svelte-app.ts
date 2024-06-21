// @ts-expect-error - no types
import singleSpaSvelte from 'single-spa-svelte';
import App from './App.svelte';
import * as cs from './app.css';

const lc = singleSpaSvelte({
  component: App,
  CSS: cs,
});

export const { bootstrap, mount, unmount } = lc;
