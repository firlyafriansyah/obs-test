import * as React from "react";

interface DialogDeleteConfirmationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onYes: () => void;
}

export default function DialogDeleteConfirmation({
  open,
  setOpen,
  onYes,
}: DialogDeleteConfirmationProps) {
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
      className={`absolute top-0 left-0 justify-center items-center bg-black/30 h-svh w-svw z-10 transition-all px-4 ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="relative max-w-[480px] sm:w-[480px] bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-2">
        <p className="text-lg font-semibold mb-3">
          Are you sure want to delete?
        </p>
        <p className="text-sm">
          This delete action can't be undone, make sure you doing the right
          action.
        </p>

        <div className="flex mt-6 mb-2 justify-end gap-2">
          <button
            ref={ref}
            className="h-10 w-24 rounded-xl bg-orange-500 text-white text-sm cursor-pointer hover:bg-orange-600"
            onClick={() => {
              onYes();
              setOpen(false);
            }}
          >
            Yes
          </button>
          <button
            className="h-10 w-24 rounded-xl bg-gray-500 text-white text-sm cursor-pointer hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(false)}
            className=" p-1 rounded-lg cursor-pointer hover:bg-gray-200"
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
              role={"button"}
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
