'use client';

import React from 'react';

const FilenameContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>] | undefined
>(undefined);

export function FilenameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filename, setFilename] = React.useState('');
  return (
    <FilenameContext.Provider value={[filename, setFilename]}>
      {children}
    </FilenameContext.Provider>
  );
}

export function useFilename() {
  const context = React.useContext(FilenameContext);
  if (!context) {
    throw new Error('useFilename must be used within a FilenameProvider');
  }
  return context;
}