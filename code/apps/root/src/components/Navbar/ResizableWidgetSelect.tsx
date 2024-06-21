import React, { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useClearDashboard } from '../../utils/ClearDashboardContext';
import { getColsRows } from '../../Layout/getColsRows';
import { useWidgetComponents } from '../../utils/LoadAppContext';
import { generateIcon } from './utils/generateIcon';
import WarningPopup from './WarningPopup';
import LayoutSelectPopUp from './LayoutSelectPopUp';

const ResizableWidgetSelect = () => {
  const { setLayout } = useWidgetComponents();
  const [popUp, setPopUp] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [layoutIcon, setLayoutIcon] = useState<ReturnType<
    typeof generateIcon
  > | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { clearDashboard } = useClearDashboard();

  const [warning, setWarning] = useState(false);
  const [paramsToNavigate, setParamsToNavigate] = useState<string>('');

  const navigateWithParams = (params: string) => {
    const urlParams = new URLSearchParams(location.search);
    const wParam = urlParams.get('w');
    const actualWidgetsInLayout = wParam?.split(',') || [];
    const widgetsExist = actualWidgetsInLayout.some((widget) => widget !== '0');
    if (!warning && widgetsExist) {
      setParamsToNavigate(params);
      setWarning(true);
    } else {
      changeLayout(params);
    }
  };

  const changeLayout = (params: string) => {
    const urlParams = new URLSearchParams(location.search);
    const wParam = urlParams.get('w');
    clearDashboard();
    urlParams.delete('w');
    const newUrl = `${location.pathname}${params}${wParam ? `&w=0` : ''}`;
    setLayout(getColsRows(params));
    setPopUp(false);
    navigate(newUrl);

    setWarning(false);
    setParamsToNavigate('');
  };

  useEffect(() => {
    const matrix = getColsRows(location.search);

    setLayoutIcon(generateIcon(matrix));
  }, [location.search]);

  const WrapperDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        WrapperDivRef.current &&
        !WrapperDivRef.current.contains(e.target as Node)
      ) {
        setPopUp(false);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [popUp]);

  return (
    <>
      {warning && (
        <WarningPopup
          changeLayout={changeLayout}
          paramsToNavigate={paramsToNavigate}
          setParamsToNavigate={setParamsToNavigate}
          setPopUp={setPopUp}
          setWarning={setWarning}
          warning={warning}
        />
      )}

      <div
        className="flex rounded-md flex-col overflow-x-auto sm:justify-end sm:mt-0 sm:pb-0 sm:overflow-x-visible [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 hs-tooltip [--placement:bottom]"
        onMouseEnter={() => !popUp && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        data-testid="resizable-layout-select"
        ref={WrapperDivRef}
      >
        <div
          className="text-white focus:ring-4 focus:outline-none font-medium text-sm text-center items-center relative p-1 rounded-full hover:bg-gray-200 hover:dark:bg-neutral-700 ease-in-out duration-200 inline-flex justify-center w-10 h-10"
          onClick={() => {
            setPopUp(!popUp);
            setShowTooltip(popUp);
          }}
          data-testid="popUpButton"
        >
          <div className="h-6 w-6 gap-0.5 p-0.5 flex flex-col">
            {layoutIcon}
          </div>
        </div>

        {popUp && <LayoutSelectPopUp navigateWithParams={navigateWithParams} />}

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
          className={`hs-tooltip-content ${showTooltip ? 'hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible' : 'opacity-0'} opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-neutral-900 text-xs font-medium text-grey-100 text-white rounded shadow-sm`}
          role="tooltip"
        >
          Change Layout
        </span>
      </div>
    </>
  );
};

export default ResizableWidgetSelect;
