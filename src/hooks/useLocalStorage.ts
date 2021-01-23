import { useEffect, useState } from 'react';
import * as Types from '../Types';

const useLocalStorage = (
  key: string,
  initialValue: Types.Workouts = []
): [Types.Workouts, (workout: Types.Workouts) => void] => {
  const [state, setState] = useState<Types.Workouts>(
    JSON.parse(localStorage.getItem(key)!) || initialValue
  );

  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
    state,
    key,
  ]);

  return [state, setState];
};

export default useLocalStorage;
