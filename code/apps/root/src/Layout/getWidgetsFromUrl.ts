import { WidgetComponentList } from '../parcels';
import { WidgetLoadComponent } from '../utils/LoadAppContext';

export function getWidgetsFromUrl() {
  const newSearchParams = new URLSearchParams(location.search)
    .get('w')
    ?.split(',');

  const urlBasedComponents: WidgetLoadComponent[] = [];

  newSearchParams?.forEach((widgetId, index) => {
    const widget = WidgetComponentList.find(
      (widget) => widget.id === Number(widgetId),
    );

    if (widget) {
      urlBasedComponents.push({ ...widget, locationIndex: index });
    }
  });

  return urlBasedComponents;
}
