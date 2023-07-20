import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface ContextoProps {
  red: number;
  green: number;
  blue: number;
  setRed: Dispatch<SetStateAction<number>>;
  setGreen: Dispatch<SetStateAction<number>>;
  setBlue: Dispatch<SetStateAction<number>>;
}

const Contexto = createContext<ContextoProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [red, setRed] = useState<number>(100);
  const [green, setGreen] = useState<number>(100);
  const [blue, setBlue] = useState<number>(100);

  const contextValue: ContextoProps = {
    red,
    green,
    blue,
    setRed,
    setGreen,
    setBlue,
  };

  return <Contexto.Provider value={contextValue}>{children}</Contexto.Provider>;
};

export { Contexto, Provider };
