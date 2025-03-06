'use client';

import { createContext, useContext, useState } from 'react';
import { TypeNameContext } from '@/types';

export const NameContext = createContext<TypeNameContext | undefined>(
  undefined
);

export const UseNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState<TypeNameContext['name']>(null);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export function UseNameContext() {
  const context = useContext(NameContext);
  if (context === undefined) {
    throw Error('UseNameContext must be used within a UseNameProvider');
  }
  return context;
}
