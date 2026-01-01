'use client';

import React, { useEffect, useState } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a placeholder during SSR to prevent chart rendering errors
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-32 sm:h-40 bg-gray-100 rounded-lg">
        <div className="text-gray-500 text-sm">Chargement du graphique...</div>
      </div>
    );
  }

  return <>{children}</>;
}