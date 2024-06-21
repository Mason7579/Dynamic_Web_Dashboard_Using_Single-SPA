import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboardNames } from '../../utils/DashboardNamesContext';

const DashboardName = () => {
  const { pathname } = useLocation();
  const { dashboardNames, setDashboardName } = useDashboardNames();
  const [name, setName] = useState(dashboardNames[pathname]);

  useEffect(() => {
    setName(dashboardNames[pathname]);
  }, [pathname, dashboardNames]);

  return (
    <input
      type="text"
      value={name || ''}
      onChange={(e) => {
        setName(e.target.value);
        setDashboardName(pathname, e.target.value);
      }}
      className="py-1 text-grey-100 dark:bg-neutral-800 hover:ring hover:ring-neutral-700 hover:rounded  placeholder:text-neutral-400 ease-in-out duration-200 dark:text-white md:text-lg text-base"
      placeholder="Untitled"
    />
  );
};

export default DashboardName;
