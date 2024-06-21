import { useClearDashboard } from '../../utils/ClearDashboardContext';

const ClearDashboard = () => {
  const { clearDashboard } = useClearDashboard();

  return (
    <div className="flex flex-row items-center gap-5 overflow-x-auto sm:justify-end sm:mt-0 sm:pb-0 sm:overflow-x-visible [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 hs-tooltip inline-block [--placement:bottom]">
      <button
        aria-label="clear-dashboard-button"
        onClick={clearDashboard}
        className="hs-tooltip-toggle relative font-medium dark:text-red-500 rounded-full hover:bg-gray-200 hover:dark:bg-neutral-700 ease-in-out duration-200 inline-flex justify-center items-center w-10 h-10"
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

        <svg
          className="flex-shrink-0 size-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></svg>
        <span
          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-neutral-900 text-xs font-medium text-white rounded shadow-sm"
          role="tooltip"
        >
          Clear Dashboard
        </span>
      </button>
    </div>
  );
};

export default ClearDashboard;
