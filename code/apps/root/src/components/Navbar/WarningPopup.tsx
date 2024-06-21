import React, { useEffect, useRef } from 'react';

type WarningPopUpProps = {
  setWarning: React.Dispatch<React.SetStateAction<boolean>>;
  setParamsToNavigate: React.Dispatch<React.SetStateAction<string>>;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  changeLayout: (params: string) => void;

  warning: boolean;
  paramsToNavigate: string;
};

const WarningPopup = (props: WarningPopUpProps) => {
  const warningBackgroundDivRefChild = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isFirstClick = true;

    const handleClick = (e: MouseEvent) => {
      if (
        warningBackgroundDivRefChild.current &&
        !isFirstClick &&
        !warningBackgroundDivRefChild.current.contains(e.target as Node)
      ) {
        props.setWarning(false);
        props.setParamsToNavigate('');
        props.setPopUp(false);
      }
      isFirstClick = false;
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [props.warning]);
  return (
    <div
      className="bg-neutral-900/60 absolute h-screen w-screen top-0 left-0"
      style={{ zIndex: 10000 }}
    >
      <div
        className="flex items-center justify-center flex-col w-full h-full"
        data-testid="warning-background-parent-div"
      >
        <div
          className="bg-neutral-700 md:w-1/3 w-3/4 h-fit py-4 flex items-center justify-around rounded-2xl flex-col border border-white/20"
          ref={warningBackgroundDivRefChild}
          data-testid="warning-background-div"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14 bg-amber-400 rounded-2xl p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <div className="flex flex-col gap-1 items-center justify-center text-white">
              {/* <h1 className="md:text-2xl text-base uppercase font-semibold">
                    Warning
                  </h1> */}
              <h1 className="md:text-2xl text-base font-bold">
                Current Layout will be discarded
              </h1>
            </div>
            <div className="flex w-full justify-around md:pt-4">
              <button
                className="bg-neutral-900 uppercase  w-24 h-12 md:w-32 md:h-12 rounded-2xl font-semibold text-white items-center justify-center text-center"
                onClick={() => {
                  props.setWarning(false);
                  props.setParamsToNavigate('');
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => props.changeLayout(props.paramsToNavigate)}
                className="bg-red-500 w-24 h-12 md:w-32 md:h-12 rounded-2xl font-semibold text-white uppercase items-center justify-center text-center"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
