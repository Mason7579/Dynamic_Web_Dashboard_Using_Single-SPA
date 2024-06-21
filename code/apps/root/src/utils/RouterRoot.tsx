import React, { useEffect } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ResizableLayout from '../Layout/ResizableLayout';
import Layout from '../Layout/Layout';

const pRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<ResizableLayout />} />

        <Route path=":id" element={<ResizableLayout />} />
      </Route>,
    ),
  );
};

const RouterRoot: React.FC = () => {
  useEffect(() => {
    require('preline/preline');
  }, []);

  useEffect(() => {
    // @ts-expect-error - preline setup
    HSStaticMethods.autoInit();
  }, [location.pathname]);

  return <RouterProvider router={pRouter()} />;
};

export default RouterRoot;
