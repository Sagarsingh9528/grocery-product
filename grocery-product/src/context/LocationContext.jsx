import { createContext, useContext, useEffect, useState } from "react";

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {

  const [userLocation, setUserLocation] = useState(null);

  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isTracking, setIsTracking] = useState(false);

  const getUserLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(coords);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  };

  const startTracking = () => {

    if (!deliveryLocation) return;

    setIsTracking(true);

    const interval = setInterval(() => {
      setDeliveryLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const value = {
    userLocation,
    deliveryLocation,
    setDeliveryLocation,
    loading,
    isTracking,
    startTracking,
    stopTracking,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

// custom hook
export const useLocation = () =>
  useContext(LocationContext);
