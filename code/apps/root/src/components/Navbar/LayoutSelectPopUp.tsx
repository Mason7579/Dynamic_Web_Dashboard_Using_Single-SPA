import React, { useState } from 'react';
import {
  MinusIcon,
  PlusIcon,
  generateIcon,
  isTheSameLayout,
} from './utils/generateIcon';
import { Button } from '../../shadcn-components/ui/button';
import { Label } from '../../shadcn-components/ui/label';

type LayoutSelectProps = {
  navigateWithParams: (params: string) => void;
};

const LayoutSelectPopUp = (props: LayoutSelectProps) => {
  const MAX_COLS = 3;
  const MAX_ROWS = 3;

  const [customLayout, setCustomLayout] = useState([[0]]);

  const handleCustomLayoutApply = () => {
    const layoutString = customLayout.map((cols) => cols.length).join(',');

    const queryParams = `?cols=${layoutString}`;
    props.navigateWithParams(queryParams);
  };
  return (
    <div className="flex h-full w-full">
      <div className="z-10 divide-y shadow w-fit bg-gray-100 dark:bg-neutral-700 absolute md:right-10 right-0 p-2 dark:text-gray-200 rounded-xl gap-3">
        <div className="flex flex-col">
          <div>
            <h1 className="text-center text-lg md:text-xl font-semibold ">
              Select Layout
            </h1>
            <div className="flex flex-row gap-2 p-2">
              <button
                className="p-3 hover:enabled:bg-gray-300 dark:hover:enabled:bg-neutral-600 disabled:opacity-50 ease-in-out duration-200 rounded-full"
                onClick={() => {
                  props.navigateWithParams('?cols=1');
                }}
                disabled={isTheSameLayout('?cols=1')}
              >
                <div className="h-8 w-8 flex flex-col gap-0.5">
                  {generateIcon([[0]])}
                </div>
              </button>
              <button
                className="p-3 hover:enabled:bg-gray-300 dark:hover:enabled:bg-neutral-600 disabled:opacity-50 ease-in-out duration-200 rounded-full"
                onClick={() => {
                  props.navigateWithParams('?cols=2');
                }}
                disabled={isTheSameLayout('?cols=2')}
              >
                <div className="h-8 w-8 flex flex-col gap-0.5">
                  {generateIcon([[0, 0]])}
                </div>
              </button>

              <button
                className="p-3 hover:enabled:bg-gray-300 dark:hover:enabled:bg-neutral-600 disabled:opacity-50 ease-in-out duration-200 rounded-full"
                onClick={() => {
                  props.navigateWithParams('?cols=1,2');
                }}
                disabled={isTheSameLayout('?cols=1,2')}
              >
                <div className="h-8 w-8 flex flex-col gap-0.5">
                  {generateIcon([[0], [0, 0]])}
                </div>
              </button>

              <button
                className="p-3 hover:enabled:bg-gray-300 dark:hover:enabled:bg-neutral-600 disabled:opacity-50 ease-in-out duration-200 rounded-full"
                onClick={() => {
                  props.navigateWithParams('?cols=2,2');
                }}
                disabled={isTheSameLayout('?cols=2,2')}
              >
                <div className="h-8 w-8 flex flex-col gap-0.5">
                  {generateIcon([
                    [0, 0],
                    [0, 0],
                  ])}
                </div>
              </button>

              <button
                className="p-3 hover:enabled:bg-gray-300 dark:hover:enabled:bg-neutral-600 disabled:opacity-50 ease-in-out duration-200 rounded-full"
                onClick={() => {
                  props.navigateWithParams('?cols=2,1,2');
                }}
                disabled={isTheSameLayout('?cols=2,1,2')}
              >
                <div className="h-8 w-8 flex flex-col gap-0.5">
                  {generateIcon([[0, 0], [0], [0, 0]])}
                </div>
              </button>
            </div>
          </div>

          <div className="w-4/5 h-0.5 bg-neutral-600 self-center rounded-full mb-4" />
          <h1 className="text-center text-lg md:text-xl font-semibold pb-4">
            Custom Layout
          </h1>

          <div className="flex flex-col px-5 items-center justify-center">
            <div className="h-10 w-10 flex flex-col gap-0.5">
              {generateIcon(customLayout)}
            </div>

            <div className="flex flex-col gap-4 w-full pt-4">
              <div className="flex justify-between items-center w-full">
                <Label htmlFor="rows" className="text-lg">
                  Rows
                </Label>
                <div className="flex items-center">
                  <Button
                    data-testid={`row-minus`}
                    className="px-2 hover:bg-neutral-500"
                    variant="outline"
                    disabled={customLayout.length <= 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomLayout((p) => p.slice(0, -1));
                    }}
                  >
                    <MinusIcon />
                  </Button>
                  <div className="w-12 flex justify-center">
                    <h1 className="text-xl" data-testid="rowCount">
                      {customLayout.length}
                    </h1>
                  </div>
                  <Button
                    className="px-2 hover:bg-neutral-500"
                    data-testid={`row-plus`}
                    variant="outline"
                    disabled={customLayout.length >= MAX_ROWS}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomLayout([...customLayout, [0]]);
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>

              <div className="w-full h-0.5 bg-neutral-600 self-center rounded-full " />
              {customLayout.map((col, index) => {
                return (
                  <div
                    className="flex justify-between items-center w-full"
                    key={crypto.randomUUID()}
                  >
                    <label className="text-lg font-medium">
                      Row {index + 1} Cell
                      {customLayout[index].length > 1 ? 's' : ''}
                    </label>
                    <div className="flex items-center ">
                      <Button
                        data-testid={`col-${index}-minus`}
                        className="px-2 hover:bg-neutral-500"
                        variant="outline"
                        disabled={col.length <= 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomLayout((prevLayout) => {
                            const newLayout = [...prevLayout];
                            newLayout[index] = newLayout[index].slice(0, -1);
                            return newLayout;
                          });
                        }}
                      >
                        <MinusIcon />
                      </Button>

                      <div className="w-12 flex justify-center">
                        <h1 className="text-xl">{col.length}</h1>
                      </div>
                      <Button
                        data-testid={`col-${index}-plus`}
                        className="px-2 hover:bg-neutral-500 disabled:cursor-not-allowed"
                        variant="outline"
                        disabled={col.length >= MAX_COLS}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomLayout((prevLayout) => {
                            const newLayout = [...prevLayout];
                            newLayout[index] = [...newLayout[index], 0];
                            return newLayout;
                          });
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-center py-4">
                <button
                  className="px-4 py-2 hover:bg-neutral-500 dark:hover:bg-neutral-800 flex items-center justify-center rounded-md bg-neutral-300 dark:bg-neutral-600"
                  onClick={handleCustomLayoutApply}
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>

                  <h1>Apply</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelectPopUp;
