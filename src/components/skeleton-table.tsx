import React from 'react';
import Skeleton from './skeleton';

export default function SkeletonTable() {
  const numberOfRows = 5;
  const numberOfCols = 6;

  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: numberOfRows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-between space-x-2">
          {Array.from({ length: numberOfCols }, (_, colIndex) => (
            <Skeleton key={colIndex} className="rounded-md bg-gray-300" width="24" height="6" />
          ))}
        </div>
      ))}
    </div>
  );
}
