
import { useState, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: GeolocationCoordinates | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    data: null,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: { message: 'Geolocation is not supported by your browser.', code: 0, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } }));
      return;
    }

    setState(s => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          data: position.coords,
        });
      },
      (error) => {
        setState({
          loading: false,
          error,
          data: null,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { ...state, getLocation };
};
