import React from 'react';
import type { UserDataType } from '../models/users';
import ImageWithSkeleton from './image-with-skeleton';

interface UsersCardProps {
  user: UserDataType;
  showDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const UsersCard = React.memo(function UsersCard({
  user,
  showDetail,
  onEdit,
  onDelete,
}: UsersCardProps): React.ReactElement {
  return (
    <div
      tabIndex={0}
      role="button"
      data-testid="user-card"
      onClick={() => showDetail()}
      onKeyDown={(e) => e.key === 'Enter' && showDetail()}
      className="group relative h-[445px] w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 text-left shadow-2xl hover:border-gray-300"
    >
      <div>
        <div className="mb-3 h-72 overflow-hidden rounded-2xl transition-[height] duration-300 ease-in-out group-hover:h-60">
          <ImageWithSkeleton
            data-testid="user-card-image"
            src="https://picsum.photos/200/300"
            className="h-full w-full object-cover"
            alt="User Profile"
          />
        </div>
        <div className="p-2">
          <div className="mb-2">
            <p className="line-clamp-1 text-xs font-light text-gray-700">@{user.username}</p>
            <p className="line-clamp-1 text-lg font-medium capitalize">{user.name}</p>
          </div>
          <div className="invisible mb-1 h-0 opacity-0 transition-[height,opacity] duration-300 ease-in-out group-hover:visible group-hover:h-auto group-hover:opacity-100">
            <p className="line-clamp-1 text-sm font-medium">{user.company.name}</p>
            <p className="line-clamp-1 text-xs">{user.company.catchPhrase}</p>
            <p className="line-clamp-1 text-xs">{user.company.bs}</p>
          </div>
        </div>
      </div>
      <div className="absolute right-2 bottom-2 left-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="h-10 w-1/2 cursor-pointer rounded-xl bg-blue-500 text-sm text-white hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-10 w-1/2 cursor-pointer rounded-xl bg-red-500 text-sm text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default UsersCard;
