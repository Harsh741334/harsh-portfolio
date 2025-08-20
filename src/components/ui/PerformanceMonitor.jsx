import React, { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Monitor load time
    const loadTime = performance.now();
    
    // Monitor memory usage (if available)
    const memoryInfo = performance.memory;
    
    setMetrics({
      loadTime: Math.round(loadTime),
      renderTime: Math.round(performance.now() - loadTime),
      memoryUsage: memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0
    });
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50 backdrop-blur-sm">
      <div>⚡ Load: {metrics.loadTime}ms</div>
      <div>🎨 Render: {metrics.renderTime}ms</div>
      {metrics.memoryUsage > 0 && <div>💾 Memory: {metrics.memoryUsage}MB</div>}
    </div>
  );
};

export default PerformanceMonitor;
