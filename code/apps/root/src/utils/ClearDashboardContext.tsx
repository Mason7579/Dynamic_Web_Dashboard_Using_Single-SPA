import { createContext, useContext } from 'react';
import { useWidgetComponents } from './LoadAppContext';
import { WindowEvents, WindowEventService } from './StatusBarEventService';

interface ClearDashboardContextType {
  clearDashboard: () => void;
}

const ClearDashboardContext = createContext<ClearDashboardContextType | null>(
  null,
);

export const useClearDashboard = () => {
  const context = useContext(ClearDashboardContext);
  if (!context) {
    throw new Error(
      'useClearDashboard must be used within a ClearDashboardProvider',
    );
  }
  return context;
};

export const ClearDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const widgets = useWidgetComponents();

  const clearDashboard = () => {
    widgets.setComponents([]);
    const newLayout = widgets.layout.map((row) => row.map(() => 0));
    widgets.setLayout(newLayout);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('w');

    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?${searchParams.toString()}`;

    localStorage.setItem(widgets.localStorageComponentsKey, '[]');
    localStorage.setItem(
      widgets.localStorageLayoutKey,
      '?' + searchParams.toString(),
    );

    window.history.replaceState(null, '', newUrl);

    // Trigger status bar update
    WindowEventService.fire(WindowEvents.STATUSBAR, {
      detail: {
        widget: -1,
        status: 'clear',
      },
    });
  };

  return (
    <ClearDashboardContext.Provider value={{ clearDashboard }}>
      {children}
    </ClearDashboardContext.Provider>
  );
};
