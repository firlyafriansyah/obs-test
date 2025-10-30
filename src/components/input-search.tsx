import React from 'react';

interface InputSearchProps {
  onChange: (value: string) => void;
}

export default function InputSearch({ onChange }: InputSearchProps): React.ReactElement {
  return (
    <div className="flex h-10 w-xl items-center rounded-lg border border-gray-300 bg-white">
      <div className="flex h-9 items-center px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-5 w-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61z"
          />
        </svg>
      </div>
      <input
        placeholder="Search..."
        className="h-9 w-full pr-2 text-sm outline-0 focus:border-0"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
