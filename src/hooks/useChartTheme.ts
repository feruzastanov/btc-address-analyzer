import { useEffect, useState } from 'react';
import { useTheme } from './useTheme';

export function useChartTheme() {
  const { isDark } = useTheme();
  const [colors, setColors] = useState({
    gridColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    textColor: isDark ? '#9CA3AF' : '#374151'
  });

  useEffect(() => {
    setColors({
      gridColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      textColor: isDark ? '#9CA3AF' : '#374151'
    });
  }, [isDark]);

  return colors;
}