import TableComponent from './components/Table';
import './styles.css';

export default function App() {
  const unloadEvent = new Event('unloadReactMessenger');

  const unloadWidget = () => {
    window.dispatchEvent(unloadEvent);
  };

  return (
    <div data-testid="App" id="app">
      <div
        id="app-header"
        className="bg-white dark:bg-[#2D2D2D] dark:text-white"
      >
        <h1 className="font-bold text-lg">Rig Info Messages</h1>
        <button className="" onClick={unloadWidget} data-testid="unload-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div
        id="app-table"
        className="dark:text-[#E2EFEF] bg-white dark:bg-[#2D2D2D]"
      >
        <TableComponent />
      </div>
    </div>
  );
}
