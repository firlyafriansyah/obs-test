import * as React from "react";
import type { UserDataType } from "../models/users";

interface DialogUserDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: UserDataType;
}

export default function DialogUserDetail({
  open,
  setOpen,
  selectedUser,
}: DialogUserDetailProps) {
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
      <div className="relative max-w-[480px] sm:w-[480px] bg-white shadow-2xl rounded-2xl px-8 pt-12 pb-2">
        <div className="flex justify-center mb-4">
          <div className="h-28 w-28 rounded-full overflow-hidden p-1 border-4 border-orange-500">
            <div className="h-full w-full rounded-full overflow-hidden">
              <img
                src="https://picsum.photos/200/300"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <p className="font-light text-xs">@{selectedUser.username}</p>
          <p className="font-medium text-lg">{selectedUser.name}</p>
          <p className="text-sm">{selectedUser.email}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Phone</p>
          <p className="text-sm font-light">{selectedUser.phone}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Website</p>
          <p className="text-sm font-light">{selectedUser.website}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Company</p>
          <p className="text-sm font-light">{selectedUser.company.name}</p>
          <p className="text-sm font-light">
            {selectedUser.company.catchPhrase}
          </p>
          <p className="text-sm font-light">{selectedUser.company.bs}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Address</p>
          <p className="text-sm font-light">
            {selectedUser.address.street}, {selectedUser.address.suite},{" "}
            {selectedUser.address.city}, {selectedUser.address.zipcode}
          </p>
          <p className="text-sm font-light">
            Lat. {selectedUser.address.geo.lat}
          </p>
          <p className="text-sm font-light">
            Long. {selectedUser.address.geo.lng}
          </p>
        </div>

        <div className="flex w-full justify-center">
          <button
            ref={ref}
            className="h-10 w-24 px-3 my-4 bg-gray-500 text-white rounded-lg cursor-pointer hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg cursor-pointer hover:bg-gray-200"
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
