import React from 'react';

interface DialogDeleteConfirmationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onYes: () => void;
}

export default function DialogDeleteConfirmation({
  open,
  setOpen,
  onYes,
}: DialogDeleteConfirmationProps): React.ReactElement {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        ref.current?.focus();
      });
    }
  }, [open]);

  return (
    <div
      className={`absolute top-0 left-0 z-10 h-svh w-svw items-center justify-center bg-black/30 px-4 transition-all ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <div className="relative max-w-[480px] rounded-2xl bg-white px-8 pt-8 pb-2 shadow-2xl sm:w-[480px]">
        <p className="mb-3 text-lg font-semibold">Are you sure want to delete?</p>
        <p className="text-sm">
          This delete action cant be undone, make sure you doing the right action.
        </p>

        <div className="mt-6 mb-2 flex justify-end gap-2">
          <button
            ref={ref}
            className="h-10 w-24 cursor-pointer rounded-xl bg-orange-500 text-sm text-white hover:bg-orange-600"
            onClick={() => {
              onYes();
              setOpen(false);
            }}
          >
            Yes
          </button>
          <button
            className="h-10 w-24 cursor-pointer rounded-xl bg-gray-500 text-sm text-white hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded-lg p-1 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              role="button"
            >
              <title>Close</title>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
