import ClearDashboard from '../ClearDashboard/ClearDashboard';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import DashboardName from '../DashboardName/DashboardName';
import ResizableWidgetSelect from './ResizableWidgetSelect';

interface Props {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <header
      className={`flex flex-wrap z-50 w-full text-sm bg-grey-100 border-b border-gray-200 dark:border-0 dark:bg-neutral-800`}
    >
      <nav
        className="w-full mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Global"
      >
        <div className="flex items-center space-x-4">
          <button
            aria-label="sidebar-button"
            className="font-medium text-grey-100 dark:text-white rounded-full hover:bg-gray-200 hover:dark:bg-neutral-700 ease-in-out duration-200 inline-flex justify-center items-center w-10 h-10"
            onClick={toggleSidebar}
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <DashboardName />
        </div>

        <div className="flex flex-row gap-2 items-center justify-center">
          <ResizableWidgetSelect />
          <DarkModeToggle />
          <ClearDashboard />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
