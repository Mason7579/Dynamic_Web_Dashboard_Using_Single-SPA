import './app.css';
import App from './App.svelte';

const app = new App({
  // @ts-expect-error - no types
  target: document.getElementById('app'),
});

export default app;
