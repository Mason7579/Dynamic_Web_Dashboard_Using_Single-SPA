import { Link, useNavigate } from 'react-router-dom';
import { useDashboardNames } from '../../utils/DashboardNamesContext';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen }: Props) => {
  const router = useNavigate();
  const [editDashboard, setEditDashboard] = useState(false);
  const { dashboardNames, setDashboardName, removeDashboard } =
    useDashboardNames();

  const handleNameChange = (path: string) => {
    return dashboardNames[path] === '' ? 'Untitled' : dashboardNames[path];
  };

  const addDashboard = () => {
    let path = `/${Object.keys(dashboardNames).length}`;

    if (dashboardNames[path]) {
      while (dashboardNames[path]) {
        path = `/${Object.keys(dashboardNames).length + 1}`;
      }
    }

    setDashboardName(path, 'Untitled');
    router(path);
    setEditDashboard(false);
  };

  const deleteDashboard = (path: string) => {
    const key = Object.keys(dashboardNames).find((key) => key === path);

    const localStorageCompsKey = 'components-' + key?.split('/').pop();
    const localStorageLayoutKey = 'layout-' + key?.split('/').pop();
    localStorage.removeItem(localStorageCompsKey);
    localStorage.removeItem(localStorageLayoutKey);

    removeDashboard(path);

    if (path === location.pathname) {
      router('/');
    }
  };

  return (
    <div
      aria-label="sidebar"
      className={`bg-white border-e border-gray-200 dark:border-0 dark:bg-neutral-800 w-32 flex-col ${isOpen ? 'flex' : 'hidden'}`}
    >
      <Link
        to="/"
        className="text-neutral-700 hover:bg-gray-100 dark:text-white hover:dark:bg-neutral-700 p-4 text-center ease-in-out duration-200 truncate ..."
      >
        {handleNameChange('/')}
      </Link>

      <Link
        to="/resizable"
        className="text-neutral-700 hover:bg-gray-100 dark:text-white hover:dark:bg-neutral-700 p-4 text-center ease-in-out duration-200 truncate ..."
      >
        {handleNameChange('/resizable')}
      </Link>

      {dashboardNames &&
        Object.keys(dashboardNames)
          .filter((path) => path !== '/' && path !== '/resizable')
          .sort()
          .map((path) => (
            <div className="flex flex-row" key={path}>
              <Link
                to={path}
                className="text-neutral-700 hover:bg-gray-100 dark:text-white hover:dark:bg-neutral-700 p-4 text-center ease-in-out duration-200 truncate ... w-full"
              >
                {handleNameChange(path)}
              </Link>
              {editDashboard && (
                <button
                  className="text-neutral-700 dark:text-white bg-red-500 hover:bg-red-700 p-4 text-center ease-in-out duration-200 w-fit transition-all"
                  onClick={() => deleteDashboard(path)}
                  data-testid={`delete-${path}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
      <div className="flex flex-row w-full items-center justify-center">
        <button
          className="text-neutral-700 dark:text-white flex items-center justify-center hover:bg-blue-700 p-4 text-center ease-in-out duration-200 w-full"
          onClick={addDashboard}
          data-testid="add-dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </button>

        <button
          className="text-neutral-700 dark:text-white enabled:hover:bg-neutral-700 flex items-center justify-center p-4 text-center ease-in-out duration-200 w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setEditDashboard((p) => !p)}
          disabled={Object.keys(dashboardNames).length <= 2}
          data-testid="edit-dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
