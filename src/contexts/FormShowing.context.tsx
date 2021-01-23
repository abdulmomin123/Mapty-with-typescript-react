import React, { createContext } from 'react';
import useToggle from '../hooks/useToggle';

interface Value {
  isFormShowing: boolean;
  toggleForm: () => void;
}

export const FromShowingContext = createContext<Partial<Value>>({});

export const FormShowingProvider: React.FC = ({ children }) => {
  // Form toggler
  const [isFormShowing, toggleForm] = useToggle(false);

  return (
    <FromShowingContext.Provider value={{ isFormShowing, toggleForm }}>
      {children}
    </FromShowingContext.Provider>
  );
};
