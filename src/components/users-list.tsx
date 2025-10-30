import * as React from 'react';
import type { UserDataType } from '../models/users';
import ImageWithSkeleton from './image-with-skeleton';

interface UsersListProps {
  user: UserDataType;
  showDetail: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const UsersList = React.memo(function UsersList({
  user,
  showDetail,
  onDelete,
  onEdit,
}: UsersListProps): React.ReactElement {
  return (
    <div
      tabIndex={0}
      role="button"
      data-testid="user-list"
      onClick={() => showDetail()}
      onKeyDown={(e) => e.key === 'Enter' && showDetail()}
      className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-3 text-start shadow-xl"
    >
      <div className="xs:w-3/5 flex w-1/2 items-center sm:group-hover:w-1/3">
        <div className="mr-6 hidden h-16 max-w-16 min-w-16 overflow-hidden rounded-full transition-all group-hover:rounded-xl sm:block sm:max-w-32 sm:min-w-32 sm:rounded-xl sm:group-hover:max-w-16 sm:group-hover:min-w-16 sm:group-hover:rounded-full">
          <ImageWithSkeleton
            data-testid="user-list-image"
            src="https://picsum.photos/200/300"
            className="h-full w-full object-cover"
            alt="User Profile"
          />
        </div>
        <div>
          <p className="w-min-32 w-max-32 line-clamp-1 text-lg font-medium capitalize">
            {user.name}
          </p>
          <p className="line-clamp-1 text-xs font-light text-gray-700">@{user.username}</p>
        </div>
      </div>
      <div className="hidden w-1/3 transition-opacity lg:group-hover:block">
        <p className="line-clamp-1 text-sm font-medium">{user.company.name}</p>
        <p className="line-clamp-1 text-xs">{user.company.catchPhrase}</p>
        <p className="line-clamp-1 text-xs">{user.company.bs}</p>
      </div>
      <div className="xs:w-2/5 flex w-1/2 justify-end gap-1 sm:w-1/3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="h-12 w-12 cursor-pointer rounded-xl bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 focus:bg-blue-600 sm:h-10 sm:w-24"
        >
          <p className="text-xs sm:text-sm">Edit</p>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-12 w-12 cursor-pointer rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 focus:bg-red-600 sm:h-10 sm:w-24"
        >
          <p className="text-xs sm:text-sm">Delete</p>
        </button>
      </div>
    </div>
  );
});

export default UsersList;
