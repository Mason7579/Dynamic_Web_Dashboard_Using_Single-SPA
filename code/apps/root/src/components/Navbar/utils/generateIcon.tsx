export const generateIcon = (matrix: number[][]) => {
  const rows = [];

  for (let row = 0; row < matrix.length; row++) {
    const cols = [];
    for (let col = 0; col < matrix[row].length; col++) {
      cols.push(
        <div
          key={`col-${col}`}
          className="w-full h-full flex flex-row bg-neutral-800 dark:bg-white rounded-sm"
        ></div>,
      );
    }
    rows.push(
      <div key={`row-${row}`} className="w-full h-full flex flex-row gap-0.5">
        {cols}
      </div>,
    );
  }

  return rows;
};

export const isTheSameLayout = (params: string) => {
  const currentParams = new URLSearchParams(location.search);
  currentParams.delete('w');

  const decodedParams = decodeURIComponent(currentParams.toString());

  return params === '?' + decodedParams;
};

export function MinusIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
