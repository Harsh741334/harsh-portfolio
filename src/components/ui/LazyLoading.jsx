import React, { Suspense, memo } from 'react';

// Lazy loading wrapper with error boundary
export const LazyComponent = memo(({ 
  component: Component, 
  fallback = <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-32"></div>,
  ...props 
}) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
});

// Loading skeleton for charts
export const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
);

// Loading skeleton for 3D components
export const Scene3DSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg h-96 flex items-center justify-center">
      <div className="text-gray-500 dark:text-gray-400">
        Loading 3D Scene...
      </div>
    </div>
  </div>
);

// Loading skeleton for blog cards
export const BlogSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  </div>
);

LazyComponent.displayName = 'LazyComponent';
