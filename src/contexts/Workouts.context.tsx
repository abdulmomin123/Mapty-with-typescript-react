import React, { createContext } from 'react';
import reducer from '../reducers/workouts.reducer';
import useLocalStorage from '../hooks/useLocalStorage';
import * as Types from '../Types';

interface Value {
  workouts: Types.Workouts;
  dispatch: (actions: Types.WorkoutActions) => void;
}

export const WorkoutsContext = createContext<Partial<Value>>({});

export const WorkoutsProvider: React.FC = ({ children }) => {
  const [workouts, dispatch] = useLocalStorage('maptyWorkouts', [], reducer);

  return (
    <WorkoutsContext.Provider value={{ workouts, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
