import * as React from "react";
import type { UserDataType } from "../models/users";

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
}: UsersListProps) {
  return (
    <div
      onClick={() => showDetail()}
      className="flex text-start gap-3 items-center justify-between p-3 w-full bg-white shadow-xl border border-gray-200 rounded-2xl group cursor-pointer"
    >
      <div className="flex items-center w-1/2 xs:w-3/5 sm:group-hover:w-1/3">
        <div className="hidden sm:block h-16 min-w-16 max-w-16 sm:min-w-32 sm:max-w-32 rounded-full sm:rounded-xl overflow-hidden mr-6 sm:group-hover:max-w-16 sm:group-hover:min-w-16 sm:group-hover:rounded-full group-hover:rounded-xl transition-all">
          <img
            src="https://picsum.photos/200/300"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-lg font-medium capitalize line-clamp-1 w-min-32 w-max-32">
            {user.name}
          </p>
          <p className="text-xs font-light text-gray-700 line-clamp-1">
            @{user.username}
          </p>
        </div>
      </div>
      <div className="w-1/3 lg:group-hover:block hidden transition-opacity">
        <p className="text-sm font-medium line-clamp-1">{user.company.name}</p>
        <p className="text-xs line-clamp-1">{user.company.catchPhrase}</p>
        <p className="text-xs line-clamp-1">{user.company.bs}</p>
      </div>
      <div className="w-1/2 xs:w-2/5 sm:w-1/3 flex justify-end gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="h-12 w-12 sm:h-10 sm:w-24 bg-blue-500 font-medium text-sm text-white rounded-xl cursor-pointer hover:bg-blue-600 focus:bg-blue-600"
        >
          <p className="text-xs sm:text-sm">Edit</p>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-12 w-12 sm:h-10 sm:w-24 bg-red-500 font-medium text-sm text-white rounded-xl cursor-pointer hover:bg-red-600 focus:bg-red-600"
        >
          <p className="text-xs sm:text-sm">Delete</p>
        </button>
      </div>
    </div>
  );
});

export default UsersList;
