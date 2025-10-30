import React from 'react';

export default function Loading(): React.ReactElement {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
    </div>
  );
}
