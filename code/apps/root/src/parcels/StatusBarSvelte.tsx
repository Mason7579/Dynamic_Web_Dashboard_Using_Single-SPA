import { useState } from 'react';
import Parcel from 'single-spa-react/parcel';
import { ErrorComponent } from '../components/Error/Error';

const StatusBarSvelte = () => {
  const [error, setError] = useState<boolean>(false);
  const parcel = (
    <Parcel
      config={() => {
        //@ts-expect-error - system is defined
        return System.import('@dk/status-bar-svelte');
      }}
      handleError={() => setError(true)}
    />
  );

  return error ? <ErrorComponent /> : parcel;
};

export default StatusBarSvelte;
