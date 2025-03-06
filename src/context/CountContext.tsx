'use client';

import { createContext, useContext, useState } from 'react';
import { TypeCountContext } from '@/types';

export const CountContext = createContext<TypeCountContext | undefined>(
  undefined
);

export const UseCountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState<TypeCountContext['count']>(null);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

export function UseCountContext() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw Error('UseCountContext must be used within a UseCountProvider');
  }
  return context;
}
