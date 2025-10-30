import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../contexts/app/store';
import { setLoadingState } from '../contexts/features/loading/loading-slice';
import {
  addUserState,
  deleteUserState,
  editUserState,
  filteredUsersState,
  setSearchState,
  setSelectedUserState,
  setUsersState,
  totalUsersState,
} from '../contexts/features/users/users-slice';
import type { UserDataType } from '../models/users';
import { setAlertState } from '../contexts/features/alert/alert-slice';

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(filteredUsersState);
  const totalUsers = useSelector(totalUsersState);
  const search = useSelector((state: RootState) => state.users.searchState);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUserState);

  const setUsers = React.useCallback(
    (users: UserDataType[]) => {
      dispatch(setUsersState(users));
    },
    [dispatch],
  );

  const setSelectedUser = React.useCallback(
    (userId: number | null) => {
      dispatch(setSelectedUserState(userId));
    },
    [dispatch],
  );

  const setSearch = React.useCallback(
    (value: string) => {
      dispatch(setSearchState(value));
    },
    [dispatch],
  );

  const addUser = React.useCallback(
    (user: UserDataType) => {
      dispatch(setLoadingState(true));
      try {
        dispatch(addUserState(user));
        setAlertState({
          show: true,
          type: 'success',
          message: 'User successfully added',
        });
      } catch (error) {
        dispatch(
          setAlertState({
            show: true,
            type: 'error',
            message: `Add user failed. Error: ${(error as Error).message}`,
          }),
        );
      } finally {
        dispatch(setLoadingState(false));
      }
    },
    [dispatch],
  );

  const editUser = React.useCallback(
    (user: UserDataType) => {
      dispatch(setLoadingState(true));
      try {
        dispatch(editUserState(user));
        dispatch(setSelectedUserState(null));
        dispatch(
          setAlertState({
            show: true,
            type: 'success',
            message: 'User successfully updated',
          }),
        );
      } catch (error) {
        dispatch(
          setAlertState({
            show: true,
            type: 'error',
            message: `Edit user failed. Error: ${(error as Error).message}`,
          }),
        );
      } finally {
        dispatch(setLoadingState(false));
      }
    },
    [dispatch],
  );

  const deleteUser = React.useCallback(
    (userId: number) => {
      dispatch(setLoadingState(true));
      try {
        dispatch(deleteUserState(userId));
        dispatch(setSelectedUserState(null));
        dispatch(
          setAlertState({
            show: true,
            type: 'success',
            message: 'User successfully deleted',
          }),
        );
      } catch (error) {
        dispatch(
          setAlertState({
            show: true,
            type: 'error',
            message: `Edit user failed. Error: ${(error as Error).message}`,
          }),
        );
      } finally {
        dispatch(setLoadingState(false));
      }
    },
    [dispatch],
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
