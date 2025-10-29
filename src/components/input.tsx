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
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <p
          className={`text-sm mb-1 ${
            errorMessage ? "text-red-600" : "text-gray-800"
          }`}
        >
          {label}
        </p>
      )}
      <input
        {...props}
        ref={ref}
        className={`h-10 border rounded-lg w-full px-3 outline-0 text-sm focus:border-gray-400 ${
          errorMessage ? "border-red-600" : "border-gray-300"
        }`}
      />
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}
