const MIN_VALUE = 1;
const MAX_VALUE = 6;

let currentColumns = 2;
let currentRows = 3;

const colsValue = document.getElementById('cols-value') as HTMLSpanElement;
const rowsValue = document.getElementById('rows-value') as HTMLSpanElement;
const totalCells = document.getElementById('total-cells') as HTMLDivElement;
const colsDec = document.getElementById('cols-dec') as HTMLButtonElement;
const colsInc = document.getElementById('cols-inc') as HTMLButtonElement;
const rowsDec = document.getElementById('rows-dec') as HTMLButtonElement;
const rowsInc = document.getElementById('rows-inc') as HTMLButtonElement;
const applyBtn = document.getElementById('apply-btn') as HTMLButtonElement;

function updateDisplay(): void {
  colsValue.textContent = String(currentColumns);
  rowsValue.textContent = String(currentRows);
  totalCells.textContent = `Total cells: ${currentColumns * currentRows}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

colsDec.addEventListener('click', () => {
  currentColumns = clamp(currentColumns - 1, MIN_VALUE, MAX_VALUE);
  updateDisplay();
});

colsInc.addEventListener('click', () => {
  currentColumns = clamp(currentColumns + 1, MIN_VALUE, MAX_VALUE);
  updateDisplay();
});

rowsDec.addEventListener('click', () => {
  currentRows = clamp(currentRows - 1, MIN_VALUE, MAX_VALUE);
  updateDisplay();
});

rowsInc.addEventListener('click', () => {
  currentRows = clamp(currentRows + 1, MIN_VALUE, MAX_VALUE);
  updateDisplay();
});

applyBtn.addEventListener('click', async () => {
  await window.api.saveConfig({
    gridColumns: currentColumns,
    gridRows: currentRows
  });

  applyBtn.textContent = 'Applied!';
  setTimeout(() => {
    applyBtn.textContent = 'Apply';
  }, 1200);
});

async function init(): Promise<void> {
  const config = await window.api.getConfig();
  currentColumns = config.gridColumns;
  currentRows = config.gridRows;
  updateDisplay();
}

init();
