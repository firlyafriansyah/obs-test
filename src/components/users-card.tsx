import * as React from "react";
import type { UserDataType } from "../models/users";

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
}: UsersCardProps) {
  return (
    <div
      onClick={() => showDetail()}
      className="w-full h-[438px] bg-white p-2 shadow-2xl text-left rounded-2xl border border-gray-200 overflow-hidden cursor-pointer group hover:border-gray-300"
    >
      <div className="h-72 rounded-2xl mb-3 overflow-hidden transition-all group-hover:h-60">
        <img
          src="https://picsum.photos/200/300"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-2">
        <div className="mb-2">
          <p className="text-xs font-light text-gray-700 line-clamp-1">
            @{user.username}
          </p>
          <p className="text-lg font-medium line-clamp-1 capitalize">
            {user.name}
          </p>
        </div>
        <div className="mb-1 hidden transition-transform group-hover:block">
          <p className="text-sm font-medium line-clamp-1">
            {user.company.name}
          </p>
          <p className="text-xs line-clamp-1">{user.company.catchPhrase}</p>
          <p className="text-xs line-clamp-1">{user.company.bs}</p>
        </div>
      </div>
      <div className="flex gap-2 px-2 mb-1 transition-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="h-10 w-1/2 bg-blue-500 text-white rounded-xl text-sm hover:bg-blue-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-10 w-1/2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default UsersCard;
