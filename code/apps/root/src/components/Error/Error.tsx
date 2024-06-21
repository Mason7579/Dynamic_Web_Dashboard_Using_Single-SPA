import React from 'react';

const ErrorComponent: React.FC = () => {
  return (
    <div className="w-full h-full bg-neutral-800 text-center items-center justify-center flex text-2xl font-semibold text-red-500 flex-col rounded-b-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <p>
        Widget not found <br />
      </p>
    </div>
  );
};

export { ErrorComponent };
