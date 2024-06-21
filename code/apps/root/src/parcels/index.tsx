import React, { memo } from 'react';

export const WidgetComponentList = [
  {
    id: 1,
    name: 'WellInfoChartSvelte',
    label: 'Well Info Chart',
    pathname: 'svelte-app.js',
    port: 4141,
  },
  {
    id: 2,
    name: 'RigInfoVue',
    label: 'Rig Status',
    pathname: 'rig-overview-vue.js',
    port: 5151,
  },
  {
    id: 3,
    name: 'angular',
    label: 'Employee Info',
    pathname: 'angular-spa.js',
    port: 7001,
  },
  {
    id: 4,
    name: 'MessagesReact',
    label: 'Rig Status Messages',
    pathname: 'dk-rig-info-react.js',
    port: 8500,
  },
  {
    id: 5,
    name: 'DrillingReact',
    label: 'Drilling Depth',
    pathname: 'dk-re-react.js',
    port: 8081,
  },
] as const;

export type WidgetName = (typeof WidgetComponentList)[number]['name'];
export type WidgetId = (typeof WidgetComponentList)[number]['id'];
export type WidgetComponent = {
  id: WidgetId;
  name: WidgetName;
};

const WidgetRender = memo(({ widgetId }: { widgetId: number }) => {
  const widget = WidgetComponentList.find((w) => w.id === widgetId);
  if (widget) {
    const WidgetComponent = React.lazy(() => {
      return import(`./${widget.name}`);
    });

    return (
      // TODO ADD A LOADING COMPONENT
      <React.Suspense fallback={<div>Loading...</div>}>
        <WidgetComponent />
      </React.Suspense>
    );
  }

  return (
    <div className="w-full h-full bg-neutral-800 text-center items-center justify-center flex text-2xl font-semibold text-red-500 flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <p>
        Widget not found <br />
      </p>
    </div>
  );
});

export default WidgetRender;
