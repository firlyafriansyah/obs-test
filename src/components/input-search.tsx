interface InputSearchProps {
  onChange: (value: string) => void;
}

export default function InputSearch({ onChange }: InputSearchProps) {
  return (
    <div className="flex items-center w-xl h-10 border border-gray-300 rounded-lg bg-white">
      <div className="h-9 flex items-center px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 text-gray-600"
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
        className="h-9 w-full focus:border-0 outline-0 text-sm pr-2"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
