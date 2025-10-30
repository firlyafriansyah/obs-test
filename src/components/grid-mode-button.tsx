import React from 'react';

interface GridModeButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function GridModeButton({
  active,
  onClick,
}: GridModeButtonProps): React.ReactElement {
  return (
    <button
      onClick={() => onClick()}
      className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 ${
        active ? 'bg-gray-900' : 'bg-white hover:bg-gray-900'
      }`}
    >
      <div className="flex gap-0.5">
        <div className="flex flex-col gap-0.5">
          <div
            className={`h-2 w-2 rounded-xs ${
              active ? 'bg-white' : 'bg-gray-900 group-hover:bg-white'
            }`}
          />
          <div
            className={`h-2 w-2 rounded-xs ${
              active ? 'bg-white' : 'bg-gray-900 group-hover:bg-white'
            }`}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div
            className={`h-2 w-2 rounded-xs ${
              active ? 'bg-white' : 'bg-gray-900 group-hover:bg-white'
            }`}
          />
          <div
            className={`h-2 w-2 rounded-xs ${
              active ? 'bg-white' : 'bg-gray-900 group-hover:bg-white'
            }`}
          />
        </div>
      </div>
    </button>
  );
}
