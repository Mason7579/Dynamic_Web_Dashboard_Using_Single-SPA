import { Fragment, Suspense } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../shadcn-components/ui/resizable';
import EmptyWidget2 from '../components/EmptyWidget/EmptyWidget2';
import { useWidgetComponents } from '../utils/LoadAppContext';
import WidgetRender from '../parcels';

const ResizableLayout = () => {
  const { layout } = useWidgetComponents();

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="bg-gray-100 dark:bg-dashboard p-4"
      data-testid="resizableLayout"
    >
      {layout.map((col, colsIndex) => (
        <Fragment key={`col-${colsIndex}`}>
          <ResizablePanel key={`col-panel-${colsIndex}`}>
            <ResizablePanelGroup
              direction="horizontal"
              key={`col-group-${colsIndex}`}
            >
              {col.map((widgetId, widgetIndex) => {
                const totalWidgetIndex =
                  layout
                    .slice(0, colsIndex)
                    .reduce((acc, currCol) => acc + currCol.length, 0) +
                  widgetIndex;

                return (
                  <Fragment key={`widget-${widgetIndex}`}>
                    <ResizablePanel key={`widget-panel-${widgetIndex}`}>
                      <Suspense fallback={<div>Loading...</div>}>
                        {widgetId !== 0 ? (
                          <WidgetRender widgetId={widgetId} />
                        ) : (
                          <EmptyWidget2 locationIndex={totalWidgetIndex} />
                        )}
                      </Suspense>
                    </ResizablePanel>
                    {widgetIndex < col.length - 1 && (
                      <ResizableHandle
                        withHandle
                        className="p-2"
                        key={`widget-handle-${widgetIndex}`}
                      />
                    )}
                  </Fragment>
                );
              })}
            </ResizablePanelGroup>
          </ResizablePanel>

          {colsIndex < layout.length - 1 && (
            <ResizableHandle
              withHandle
              className="p-2"
              key={`col-handle-${colsIndex}`}
            />
          )}
        </Fragment>
      ))}
    </ResizablePanelGroup>
  );
};

export default ResizableLayout;
