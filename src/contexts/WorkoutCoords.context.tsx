import React, { useState, createContext } from 'react';
import { LatLngLiteral } from 'leaflet';

interface Value {
  workoutCoords: LatLngLiteral;
  setWorkoutCoords: (coords: LatLngLiteral) => void;
}

export const WorkoutCoordsContext = createContext<Partial<Value>>({});

export const WorkoutCoordsProvider: React.FC = ({ children }) => {
  // Currently clicked position on the map
  const [workoutCoords, setWorkoutCoords] = useState<LatLngLiteral>();

  return (
    <WorkoutCoordsContext.Provider value={{ workoutCoords, setWorkoutCoords }}>
      {children}
    </WorkoutCoordsContext.Provider>
  );
};
