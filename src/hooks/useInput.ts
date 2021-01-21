import { useState } from 'react';

const useInput = (
  initialValue = ''
): [string, (newState: string) => void, () => void] => {
  const [state, setState] = useState(initialValue);

  const reset = () => setState('');

  return [state, setState, reset];
};

export default useInput;
