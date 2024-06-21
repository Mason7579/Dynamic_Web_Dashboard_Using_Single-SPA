import React, { createContext, useContext, useState, useEffect } from 'react';

interface DashboardNamesContextType {
  dashboardNames: { [key: string]: string };
  setDashboardName: (path: string, name: string) => void;
  removeDashboard: (path: string) => void;
}

interface Props {
  children: React.ReactNode;
}

const DashboardNamesContext = createContext<DashboardNamesContextType>({
  dashboardNames: {},
  setDashboardName: () => {},
  removeDashboard: () => {},
});

export const DashboardNamesProvider = ({ children }: Props) => {
  const [dashboardNames, setDashboardNames] = useState(() => {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith('/'));

    const dashboardNames = keys.reduce(
      (acc, key) => {
        const item = localStorage.getItem(key);
        if (item) {
          acc[key] = item;
        }
        return acc;
      },
      {} as { [key: string]: string },
    );

    if (!dashboardNames['/'] || !dashboardNames['/resizable']) {
      dashboardNames['/'] = 'Untitled';
      dashboardNames['/resizable'] = 'Untitled';
    }

    return dashboardNames;
  });

  useEffect(() => {
    Object.entries(dashboardNames).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [dashboardNames]);

  const setDashboardName = (path: string, name: string) => {
    setDashboardNames((prevNames) => ({
      ...prevNames,
      [path]: name,
    }));
  };

  const removeDashboard = (path: string) => {
    setDashboardNames((prevNames) => {
      const newNames = { ...prevNames };
      delete newNames[path];
      return newNames;
    });

    localStorage.removeItem(path);
  };

  return (
    <DashboardNamesContext.Provider
      value={{ dashboardNames, setDashboardName, removeDashboard }}
    >
      {children}
    </DashboardNamesContext.Provider>
  );
};

export const useDashboardNames = () => useContext(DashboardNamesContext);
