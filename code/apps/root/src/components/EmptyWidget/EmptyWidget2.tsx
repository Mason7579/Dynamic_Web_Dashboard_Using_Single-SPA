import { useEffect, useState } from 'react';
import { WidgetComponent, WidgetComponentList } from '../../parcels';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../shadcn-components/ui/select';
import { useWidgetComponents } from '../../utils/LoadAppContext';

const EmptyWidget2 = ({ locationIndex }: { locationIndex: number }) => {
  const { components, loadComponent, layout, setLayout } =
    useWidgetComponents();

  const setWidgetIntoLayout = (
    widget: WidgetComponent,
    locationIndex: number,
  ) => {
    const newLayout = layout;

    let widgetIndex = 0;
    for (let i = 0; i < newLayout.length; i++) {
      for (let j = 0; j < newLayout[i].length; j++) {
        if (locationIndex === widgetIndex) {
          newLayout[i][j] = widget.id;
        }
        widgetIndex++;
      }
    }

    setLayout(newLayout);
  };
  const [availableWidgets, setAvailableWidgets] = useState<number[]>([]);

  const allWidgetsSelected =
    components.length === WidgetComponentList.length ||
    availableWidgets.length <= 0 ||
    components.length === availableWidgets.length;

  const handleWidgetSelect = (newWidgetId: string) => {
    const widgetId = Number(newWidgetId);
    const searchParams = new URLSearchParams(location.search);
    const widgetParam = searchParams.get('w');

    const widgetList = widgetParam ? widgetParam.split(',') : [];

    while (widgetList.length <= locationIndex) {
      widgetList.push('0');
    }
    widgetList[locationIndex] = String(widgetId);

    searchParams.set('w', widgetList.join(','));

    const newUrl = `${location.pathname}?${searchParams.toString()}`;

    const widget = WidgetComponentList[widgetId - 1];

    history.pushState({ path: newUrl }, '', newUrl);

    loadComponent(widget, locationIndex);
    setWidgetIntoLayout(widget, locationIndex);
  };

  useEffect(() => {
    const baseLocalhostUrl = 'http://localhost';
    const isDevEnv = process.env.NODE_ENV === 'development';
    const finalUrls = WidgetComponentList.map((widget) => {
      const baseUrl = isDevEnv
        ? `${baseLocalhostUrl}:${widget.port}`
        : baseLocalhostUrl;
      return `${baseUrl}/${widget.pathname}`;
    });

    const urlPromises = finalUrls.map((url, index) => {
      const widgetId = availableWidgets.indexOf(index + 1);
      return fetch(url)
        .then((response) => {
          if (response.ok && !(widgetId > -1)) {
            setAvailableWidgets((p) => [...p, index + 1]);
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    });

    async function checkUrls() {
      await Promise.allSettled(urlPromises);
    }

    checkUrls().catch(() => console.log('Failed to fetch widget list'));
  }, []);

  return (
    <div className="flex bg-white border dark:border-0 border-gray-200 dark:bg-widget w-full h-full rounded-xl text-white dark:text-blue-500 font-semibold text-sm flex-col justify-center items-center">
      <Select
        onValueChange={(e) => handleWidgetSelect(e)}
        disabled={allWidgetsSelected}
      >
        <SelectTrigger className="w-fit" data-testid="widget-select">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 fill-blue-500 dark:fill-addwidgetbutton"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12"
              strokeWidth="1"
            />
          </svg>
        </SelectTrigger>

        <SelectContent className="bg-white dark:bg-neutral-800 border border-neutral-700 divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full gap-3">
          {WidgetComponentList.map((widget) =>
            components.find(
              (c) => c.name === widget.name,
            ) ? null : availableWidgets.includes(widget.id) ? (
              <SelectItem
                key={widget.id}
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-base focus:outline-none text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100 focus:bg-neutral-700 pr-10"
                value={widget.id.toString()}
                data-testid="widget-select-item"
              >
                {widget.label}
              </SelectItem>
            ) : null,
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmptyWidget2;
