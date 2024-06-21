import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import BarChart from './BarChartComponent';

export default function Root({ title = 'Drilling Data' }) {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Drill Depths',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [],
      },
    ],
  });
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time t (seconds)',
          font: {
            size: 16,
          },
        },
        beginAtZero: true,
      },

      y: {
        title: {
          display: true,
          text: 'Meters',
          font: {
            size: 16,
          },
        },
        beginAtZero: true,
      },
    },
  };
  const unloadWidget = () => {
    const unloadEvent = new Event('unloadDrillingReact');
    window.dispatchEvent(unloadEvent);
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.API_URL}/bar-chart-backend/randomNumberHub`)
      .build();

    setConnection(newConnection);
    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      let numberBatch = [];

      connection.on('ReceiveNumber', (number) => {
        numberBatch.push(number);
        if (numberBatch.length === 3) {
          setChartData((prevChartData) => {
            const newDataPoints = [
              ...prevChartData.datasets[0].data,
              ...numberBatch,
            ];
            const newLabels = [...prevChartData.labels];
            numberBatch.forEach((_, index) => {
              newLabels.push(`${prevChartData.labels.length + index + 1}`);
            });

            // Send data to the status bar
            const detail = {
              widgetId: 5,
              data: {
                rate: number,
              },
            };
            const dataUpdatedEvent = new CustomEvent('DataUpdated', {
              detail: detail,
            });
            window.dispatchEvent(dataUpdatedEvent);

            numberBatch = [];

            return {
              ...prevChartData,
              labels: newLabels,
              datasets: [
                {
                  ...prevChartData.datasets[0],
                  data: newDataPoints,
                },
              ],
            };
          });
        }
      });

      connection.start().then(() => {
        setConnectionStatus('connected');
        connection.invoke('StartSendingRandomNumbers');
      });
    }

    return () => {
      connection?.stop();
    };
  }, [connection]);

  const toggleConnection = () => {
    if (connectionStatus === 'connected') {
      connection.stop().then(() => {
        setConnectionStatus('disconnected');
      });
    } else {
      connection?.start().then(() => {
        setConnectionStatus('connected');
        connection.invoke('StartSendingRandomNumbers');
      });
    }
  };

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        borderRadius: '1rem',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
      className="bg-white dark:bg-[#2D2D2D] dark:text-white"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0.5rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
        }}
        className="dark:text-[#E2EFEF] bg-white dark:bg-[#2D2D2D]"
      >
        <h1>{title}</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={toggleConnection}
            style={{ marginRight: '0.5rem' }}
            className="dark:text-white"
          >
            {connectionStatus === 'connected' ? 'Stop' : 'Start'}
          </button>
          <span
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'inline-block',
              marginLeft: '10px',
              backgroundColor:
                connectionStatus === 'connected' ? 'green' : 'red',
            }}
          ></span>
          <button
            onClick={unloadWidget}
            aria-label="Unload Component"
            className="dark:text-white"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              padding: '0',
              marginLeft: '10px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              style={{ width: '24px', height: '24px' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
          padding: '1rem',
          flexGrow: 1,
        }}
      >
        {' '}
        {}
        <BarChart data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
