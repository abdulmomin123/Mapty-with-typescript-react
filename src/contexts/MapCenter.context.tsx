import React, { useState, createContext } from 'react';
import { LatLngLiteral } from 'leaflet';

interface Value {
  mapCenter: LatLngLiteral;
  setMapCenter: (center: LatLngLiteral) => void;
}

export const MapCenterContext = createContext<Partial<Value>>({});

export const MapCenterProvider: React.FC = ({ children }) => {
  // The current center view of the map
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapCenterContext.Provider>
  );
};
