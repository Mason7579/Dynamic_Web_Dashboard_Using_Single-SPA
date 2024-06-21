import { useState } from 'react';
import Parcel from 'single-spa-react/parcel';
import { ErrorComponent } from '../components/Error/Error';

const WellInfoChartSvelte = () => {
  const [error, setError] = useState<boolean>(false);
  const unloadWidget = () => {
    const unloadEvent = new Event('unloadOilWellChartSvelte');
    window.dispatchEvent(unloadEvent);
    setError(false); // Reset error state when unloading
  };
  const parcel = (
    <Parcel
      wrapStyle={{ height: '100%', width: '100%' }}
      config={() => {
        //@ts-expect-error - system is defined
        return System.import('@dk/svelte-app');
      }}
      handleError={() => setError(true)}
    />
  );
  return error ? (
    <div className="flex flex-col text-[#E2EFEF] bg-[#2D2D2D] rounded-xl w-full h-full">
      <div className="bg-[#222222] flex flex-row justify-between p-2 rounded-t-xl px-5">
        <h1>Oil Well Chart</h1>
        <button onClick={unloadWidget} id="unload-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <ErrorComponent />
    </div>
  ) : (
    parcel
  );
};

export default WellInfoChartSvelte;
