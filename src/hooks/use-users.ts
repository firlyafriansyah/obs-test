import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../contexts/app/store";
import {
  addUserState,
  deleteUserState,
  editUserState,
  filteredUsersState,
  setSearchState,
  setSelectedUserState,
  setUsersState,
  totalUsersState,
} from "../contexts/features/users/users-slice";
import type { UserDataType } from "../models/users";

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(filteredUsersState);
  const totalUsers = useSelector(totalUsersState);
  const search = useSelector((state: RootState) => state.users.searchState);
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUserState
  );

  const setUsers = React.useCallback(
    (users: UserDataType[]) => {
      dispatch(setUsersState(users));
    },
    [dispatch]
  );

  const setSelectedUser = React.useCallback(
    (userId: number | null) => {
      dispatch(setSelectedUserState(userId));
    },
    [dispatch]
  );

  const setSearch = React.useCallback(
    (value: string) => {
      dispatch(setSearchState(value));
    },
    [dispatch]
  );

  const addUser = React.useCallback(
    (user: UserDataType) => {
      dispatch(addUserState(user));
    },
    [dispatch]
  );

  const editUser = React.useCallback(
    (user: UserDataType) => {
      dispatch(editUserState(user));
    },
    [dispatch]
  );

  const deleteUser = React.useCallback(
    (userId: number) => {
      dispatch(deleteUserState(userId));
    },
    [dispatch]
  );

  return {
    users,
    totalUsers,
    search,
    selectedUser,
    setUsers,
    setSelectedUser,
    setSearch,
    addUser,
    editUser,
    deleteUser,
  };
}
