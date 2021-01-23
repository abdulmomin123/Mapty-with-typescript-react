import React, { useEffect, useReducer } from 'react';
import * as Types from '../Types';

const useLocalStorage = (
  key: string,
  initialValue: Types.Workouts = [],
  reducer: React.Reducer<Types.Workouts, Types.WorkoutActions>
): [Types.Workouts, React.Dispatch<Types.WorkoutActions>] => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(key)!) || initialValue
  );

  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
    state,
    key,
  ]);

  return [state, dispatch];
};

export default useLocalStorage;
