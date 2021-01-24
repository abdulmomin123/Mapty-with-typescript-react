import React, { useState, createContext } from 'react';

interface Value {
  isWorkoutClicked: boolean;
  setWorkoutClicked: (state: boolean) => void;
}

export const WorkoutClickedContext = createContext<Partial<Value>>({});

export const WorkoutClickedProvider: React.FC = ({ children }) => {
  // If the user has clicked on a workout
  const [isWorkoutClicked, setWorkoutClicked] = useState(false);

  return (
    <WorkoutClickedContext.Provider
      value={{
        isWorkoutClicked,
        setWorkoutClicked,
      }}
    >
      {children}
    </WorkoutClickedContext.Provider>
  );
};
