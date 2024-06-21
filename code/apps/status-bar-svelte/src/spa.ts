// @ts-expect-error - no types
import singleSpaSvelte from 'single-spa-svelte';
import App from './App.svelte';
import * as css from './app.css';

const lc = singleSpaSvelte({
  component: App,
  CSS: css,
});

export const { bootstrap, mount, unmount } = lc;
