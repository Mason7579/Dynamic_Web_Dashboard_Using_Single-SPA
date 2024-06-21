import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { WidgetComponent } from '../parcels';
import { getColsRows } from '../Layout/getColsRows';
import { WindowEvents, WindowEventService } from './StatusBarEventService';
import { useNavigate } from 'react-router-dom';
import { getLocalComponents, getLocalLayout } from '../Layout/getLocalStorage';
import { getWidgetsFromUrl } from '../Layout/getWidgetsFromUrl';

export type WidgetLoadComponent = {
  locationIndex: number;
} & WidgetComponent;

type WidgetComponentContextType = {
  components: WidgetLoadComponent[];
  loadComponent: (widget: WidgetComponent, locationIndex: number) => void;
  layout: number[][];
  setLayout: React.Dispatch<React.SetStateAction<number[][]>>;
  setComponents: React.Dispatch<React.SetStateAction<WidgetLoadComponent[]>>;
  localStorageComponentsKey: string;
  localStorageLayoutKey: string;
};

const WidgetComponentContext = createContext<WidgetComponentContextType | null>(
  null,
);
export const useWidgetComponents = () => {
  const context = useContext(WidgetComponentContext);

  if (!context) {
    throw new Error(
      'useWidgetComponents must be used within a WidgetComponentProvider',
    );
  }

  return context;
};

export const WidgetComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [components, setComponents] = useState<WidgetLoadComponent[]>([]);
  const [layout, setLayout] = useState<number[][]>([]);

  const layoutType = location.pathname.split('/')[1] || 'static';
  const localStorageComponentsKey = `components-${layoutType}`;
  const localStorageLayoutKey = `layout-${layoutType}`;

  const handleUnload = (widgetId: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const widgetParam = searchParams.get('w');
    const widgetList = widgetParam ? widgetParam.split(',') : [];
    const newWidgetList = widgetList.map((id) =>
      Number(id) === widgetId ? '0' : id,
    );

    searchParams.set('w', newWidgetList.join(','));
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    setComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== widgetId),
    );

    setLayout(getColsRows(window.location.search));

    // Trigger status bar update
    WindowEventService.fire(WindowEvents.STATUSBAR, {
      detail: {
        widget: widgetId,
        status: 'unload',
      },
    });
  };

  useEffect(() => {
    addEventListener('unloadDrillingReact', () => handleUnload(5));
    addEventListener('unloadReactMessenger', () => handleUnload(4));
    addEventListener('unloadEmployeeInfo', () => handleUnload(3));
    addEventListener('unloadRigInfoVue', () => handleUnload(2));
    addEventListener('unloadOilWellChartSvelte', () => handleUnload(1));

    return () => {
      removeEventListener('unloadDrillingReact', () => handleUnload(5));
      removeEventListener('unloadReactMessenger', () => handleUnload(4));
      removeEventListener('unloadEmployeeInfo', () => handleUnload(3));
      removeEventListener('unloadRigInfoVue', () => handleUnload(2));
      removeEventListener('unloadOilWellChartSvelte', () => handleUnload(1));
    };
  });

  const loadComponent = (widget: WidgetComponent, locationIndex: number) => {
    const newComps = [...components, { ...widget, locationIndex }];

    setComponents(newComps);

    localStorage.setItem(
      localStorageLayoutKey,
      JSON.stringify(location.search),
    );
    localStorage.setItem(localStorageComponentsKey, JSON.stringify(newComps));
  };

  const router = useNavigate();

  useEffect(() => {
    const layoutLocalStorageKey = `layout-${location.pathname.split('/').pop() || 'static'}`;
    const componentsLocalStorageKey = `components-${location.pathname.split('/').pop() || 'static'}`;
    if (!location.search || !location.search.includes('cols')) {
      router(location.pathname + getLocalLayout(layoutLocalStorageKey));
      setLayout(getColsRows(getLocalLayout(layoutLocalStorageKey)));
      setComponents(getLocalComponents(componentsLocalStorageKey));
    } else {
      setLayout(getColsRows(location.search));
      setComponents(getWidgetsFromUrl());
    }
  }, [location.pathname]);

  useEffect(() => {
    // Update the status bar with the current dashboard's widgets info
    if (components.length > 0) {
      components.forEach((component) => {
        WindowEventService.fire(WindowEvents.STATUSBAR, {
          detail: {
            widget: component.id,
            status: 'load',
          },
        });
      });
    }

    // Clear status bar on dashboard switch or when there are no widgets
    return () => {
      WindowEventService.fire(WindowEvents.STATUSBAR, {
        detail: {
          status: 'clear',
        },
      });
    };
  }, [components, location.pathname]);

  return (
    <WidgetComponentContext.Provider
      value={{
        components,
        localStorageLayoutKey,
        localStorageComponentsKey,
        loadComponent,
        layout,
        setLayout,
        setComponents,
      }}
    >
      {children}
    </WidgetComponentContext.Provider>
  );
};
