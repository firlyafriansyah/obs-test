import React from 'react';

interface ListModeButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function ListModeButton({
  active,
  onClick,
}: ListModeButtonProps): React.ReactElement {
  return (
    <button
      onClick={() => onClick()}
      className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 ${
        active ? 'bg-gray-900' : 'bg-white hover:bg-gray-900'
      }`}
    >
      <div
        className={`h-2 w-5 rounded-xs ${active ? 'bg-white' : 'bg-gray-900 group-hover:bg-white'}`}
      />
    </button>
  );
}
