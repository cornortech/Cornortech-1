// src/components/DisableInspect.tsx
'use client';
import { useEffect } from 'react';

export default function DisableInspect() {
  useEffect(() => {
    // Disable right-click
    const handleContext = (e: MouseEvent) => e.preventDefault();

    // Block DevTools shortcuts
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContext);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('contextmenu', handleContext);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return null;
}