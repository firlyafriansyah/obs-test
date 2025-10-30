import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  label,
  className,
  errorMessage,
  ref,
  ...props
}: InputProps): React.ReactElement {
  return (
    <div className={className}>
      {label && (
        <p className={`mb-1 text-sm ${errorMessage ? 'text-red-600' : 'text-gray-800'}`}>{label}</p>
      )}
      <input
        {...props}
        ref={ref}
        className={`h-10 w-full rounded-lg border px-3 text-sm outline-0 focus:border-gray-400 ${
          errorMessage ? 'border-red-600' : 'border-gray-300'
        }`}
      />
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}
