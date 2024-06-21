import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import './index.css';
import RouterRoot from './utils/RouterRoot';

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: RouterRoot,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    console.log(err, info, props);
    return <div>Something went wrong</div>;
  },
});
