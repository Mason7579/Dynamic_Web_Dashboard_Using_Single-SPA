export const getColsRows = (url: string) => {
  const urlSearchParams = new URLSearchParams(url);

  const MAX_COLUMNS = 3;
  const MAX_ROWS = 3;

  const colsParam = urlSearchParams.get('cols') || '1';
  const cols = colsParam.split(',').map((col) => parseInt(col));

  const validatedCols = cols.map((col) => Math.min(col, MAX_COLUMNS));
  const totalRows = Math.min(validatedCols.length, MAX_ROWS);

  const wlistParam = urlSearchParams.get('w');
  let wlist: number[] = [];

  if (wlistParam) {
    wlist = wlistParam.split(',').map((item) => parseInt(item.trim()));
  }

  const totalAvailableCells = validatedCols.reduce((acc, col) => acc + col, 0);

  const sumWlist = wlist.reduce((acc, curr) => acc + curr, 0);
  if (sumWlist > totalAvailableCells) {
    wlist = wlist.slice(0, totalAvailableCells);
  }

  const layout: number[][] = [];

  let currentWidgetIndex = 0;

  for (let i = 0; i < totalRows; i++) {
    const row: number[] = [];
    for (let j = 0; j < validatedCols[i]; j++) {
      row.push(wlist[currentWidgetIndex] || 0);
      currentWidgetIndex++;
    }
    layout.push(row);
  }

  return layout;
};
