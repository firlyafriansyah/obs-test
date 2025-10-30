import React from 'react';
import type { UserDataType } from '../models/users';
import ImageWithSkeleton from './image-with-skeleton';

interface DialogUserDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: UserDataType;
}

export default function DialogUserDetail({
  open,
  setOpen,
  selectedUser,
}: DialogUserDetailProps): React.ReactElement {
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
      <div className="relative max-w-[480px] rounded-2xl bg-white px-8 pt-12 pb-2 shadow-2xl sm:w-[480px]">
        <div className="mb-4 flex justify-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-orange-500 p-1">
            <div className="h-full w-full overflow-hidden rounded-full">
              <ImageWithSkeleton
                data-testid="profile-image"
                src="https://picsum.photos/200/300"
                className="h-full w-full object-cover"
                alt="User Profile"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <p className="text-xs font-light">@{selectedUser.username}</p>
          <p className="text-lg font-medium">{selectedUser.name}</p>
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
          <p className="text-sm font-light">{selectedUser.company.catchPhrase}</p>
          <p className="text-sm font-light">{selectedUser.company.bs}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Address</p>
          <p className="text-sm font-light">
            {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}
            , {selectedUser.address.zipcode}
          </p>
          <p className="text-sm font-light">Lat. {selectedUser.address.geo.lat}</p>
          <p className="text-sm font-light">Long. {selectedUser.address.geo.lng}</p>
        </div>

        <div className="flex w-full justify-center">
          <button
            ref={ref}
            className="my-4 h-10 w-24 cursor-pointer rounded-lg bg-gray-500 px-3 text-white hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Close
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
              <title>X</title>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
