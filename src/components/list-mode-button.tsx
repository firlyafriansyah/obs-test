interface ListModeButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function ListModeButton({
  active,
  onClick,
}: ListModeButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 group cursor-pointer ${
        active ? "bg-gray-900" : "bg-white hover:bg-gray-900"
      }`}
    >
      <div
        className={`h-2 w-5 rounded-xs ${
          active ? "bg-white" : "bg-gray-900 group-hover:bg-white "
        }`}
      />
    </button>
  );
}
