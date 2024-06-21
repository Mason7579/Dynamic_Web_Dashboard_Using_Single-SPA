import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';
import './index.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
});

export const { bootstrap, mount, unmount } = lifecycles;