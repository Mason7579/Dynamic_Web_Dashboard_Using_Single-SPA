interface EmptyWidgetProps {
  onSelection: (appName: string) => void;
}

const EmptyWidget: React.FC<EmptyWidgetProps> = ({ onSelection }) => {
  const handleSelection = (appName: string) => {
    onSelection(appName); // Pass the appName to the parent component
  };

  return (
    <div className="flex bg-widget w-full h-full rounded-lg text-blue-500 font-semibold text-sm flex-col justify-center items-center">
      <div className="hs-dropdown relative inline-flex">
        <button
          aria-label="hs-dropdown-default"
          className="inline-flex flex-col items-center hs-dropdown-toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 fill-addwidgetbutton"
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
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 shadow-md rounded-lg p-2 mt-2 bg-neutral-800 border border-neutral-700 divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          aria-labelledby="hs-dropdown-default"
        >
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 focus:bg-neutral-700"
            href="#"
            onClick={() => handleSelection('loadApp')}
          >
            WellInfoChartSvelte
          </a>
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 focus:bg-neutral-700"
            href="#"
            onClick={() => handleSelection('loadApp2')}
          >
            TableAngular
          </a>
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 focus:bg-neutral-700"
            href="#"
            onClick={() => handleSelection('loadApp3')}
          >
            RigInfoVue
          </a>
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm focus:outline-none text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 focus:bg-neutral-700"
            href="#"
            onClick={() => handleSelection('loadApp4')}
          >
            MessagesReact
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmptyWidget;
