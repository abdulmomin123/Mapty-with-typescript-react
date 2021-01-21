import { useState } from 'react';

const useToggle = (initialValue = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggleState = () => setState(!state);

  return [state, toggleState];
};

export default useToggle;
