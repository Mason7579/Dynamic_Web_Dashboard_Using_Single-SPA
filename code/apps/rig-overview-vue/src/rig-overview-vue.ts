import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import './style.css';
import { cssLifecycleFactory } from 'vite-plugin-single-spa/ex';

const lc = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
});

const cssLc = cssLifecycleFactory('spa');

export const bootstrap = [cssLc.bootstrap, lc.bootstrap];
export const mount = [cssLc.mount, lc.mount];
export const unmount = [cssLc.unmount, lc.unmount];
