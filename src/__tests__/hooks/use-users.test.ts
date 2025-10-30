import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useUsers from '../../hooks/use-users';
import type { UserDataType } from '../../models/users';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../contexts/features/users/users-slice', () => ({
  setUsersState: vi.fn((payload) => ({ type: 'users/setUsersState', payload })),
  setSelectedUserState: vi.fn((payload) => ({ type: 'users/setSelectedUserState', payload })),
  setSearchState: vi.fn((payload) => ({ type: 'users/setSearchState', payload })),
  addUserState: vi.fn((payload) => ({ type: 'users/addUserState', payload })),
  editUserState: vi.fn((payload) => ({ type: 'users/editUserState', payload })),
  deleteUserState: vi.fn((payload) => ({ type: 'users/deleteUserState', payload })),
  filteredUsersState: vi.fn(),
  totalUsersState: vi.fn(),
}));

vi.mock('../contexts/features/loading/loading-slice', () => ({
  setLoadingState: vi.fn((payload) => ({ type: 'loading/setLoadingState', payload })),
}));

vi.mock('../contexts/features/alert/alert-slice', () => ({
  setAlertState: vi.fn((payload) => ({ type: 'alert/setAlertState', payload })),
}));

describe('useUsers', () => {
  const mockDispatch = vi.fn();
  const mockUseDispatch = useDispatch as unknown as ReturnType<typeof vi.fn>;
  const mockUseSelector = useSelector as unknown as ReturnType<typeof vi.fn>;

  const mockUsers: UserDataType[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' },
      },
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Doe Inc',
        catchPhrase: 'Just do it',
        bs: 'business solutions',
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({
          users: {
            usersState: mockUsers,
            searchState: '',
            selectedUserState: null,
          },
        });
      }
      return mockUsers;
    });
  });

  describe('Hook Initialization', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useUsers());

      expect(result.current).toHaveProperty('users');
      expect(result.current).toHaveProperty('totalUsers');
      expect(result.current).toHaveProperty('search');
      expect(result.current).toHaveProperty('selectedUser');
      expect(result.current).toHaveProperty('setUsers');
      expect(result.current).toHaveProperty('setSelectedUser');
      expect(result.current).toHaveProperty('setSearch');
      expect(result.current).toHaveProperty('addUser');
      expect(result.current).toHaveProperty('editUser');
      expect(result.current).toHaveProperty('deleteUser');
    });

    it('should initialize with correct selectors', () => {
      renderHook(() => useUsers());

      expect(mockUseSelector).toHaveBeenCalled();
    });
  });

  describe('setUsers Function', () => {
    it('should dispatch setUsersState action', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setUsers(mockUsers);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setUsersState',
        payload: mockUsers,
      });
    });

    it('should handle empty array', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setUsers([]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setUsersState', payload: [] });
    });
  });

  describe('setSelectedUser Function', () => {
    it('should dispatch setSelectedUserState with user id', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setSelectedUser(1);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSelectedUserState', payload: 1 });
    });

    it('should dispatch setSelectedUserState with null', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setSelectedUser(null);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setSelectedUserState',
        payload: null,
      });
    });
  });

  describe('setSearch Function', () => {
    it('should dispatch setSearchState action', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setSearch('john');
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSearchState', payload: 'john' });
    });

    it('should handle empty search string', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.setSearch('');
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSearchState', payload: '' });
    });
  });

  describe('addUser Function', () => {
    it('should dispatch loading and addUserState actions', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.addUser(mockUsers[0]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'loading/setLoadingState', payload: true });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/addUserState',
        payload: mockUsers[0],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'loading/setLoadingState',
        payload: false,
      });
    });

    it('should set loading to true before adding user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.addUser(mockUsers[0]);
      });

      const firstCall = mockDispatch.mock.calls[0][0];
      expect(firstCall).toEqual({ type: 'loading/setLoadingState', payload: true });
    });

    it('should set loading to false after adding user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.addUser(mockUsers[0]);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });

    it('should dispatch addUserState with user data', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.addUser(mockUsers[0]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/addUserState',
        payload: mockUsers[0],
      });
    });

    it('should always set loading to false in finally block', () => {
      const mockError = new Error('Add failed');
      mockDispatch.mockImplementationOnce((action) => {
        if (action.type === 'users/addUserState') {
          throw mockError;
        }
      });

      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.addUser(mockUsers[0]);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });
  });

  describe('editUser Function', () => {
    it('should dispatch loading, editUserState, and alert actions', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'loading/setLoadingState', payload: true });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/editUserState',
        payload: mockUsers[0],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setSelectedUserState',
        payload: null,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'alert/setAlertState',
        payload: {
          show: true,
          type: 'success',
          message: 'User successfully updated',
        },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'loading/setLoadingState',
        payload: false,
      });
    });

    it('should clear selected user after edit', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setSelectedUserState',
        payload: null,
      });
    });

    it('should set loading to true before editing user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      const firstCall = mockDispatch.mock.calls[0][0];
      expect(firstCall).toEqual({ type: 'loading/setLoadingState', payload: true });
    });

    it('should set loading to false after editing user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });

    it('should show success alert after edit', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'alert/setAlertState',
        payload: {
          show: true,
          type: 'success',
          message: 'User successfully updated',
        },
      });
    });

    it('should always set loading to false in finally block', () => {
      const mockError = new Error('Edit failed');
      mockDispatch.mockImplementationOnce((action) => {
        if (action.type === 'users/editUserState') {
          throw mockError;
        }
      });

      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.editUser(mockUsers[0]);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });
  });

  describe('deleteUser Function', () => {
    it('should dispatch loading, deleteUserState, and alert actions', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'loading/setLoadingState', payload: true });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/deleteUserState', payload: 1 });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setSelectedUserState',
        payload: null,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'alert/setAlertState',
        payload: {
          show: true,
          type: 'success',
          message: 'User successfully deleted',
        },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'loading/setLoadingState',
        payload: false,
      });
    });

    it('should clear selected user after delete', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'users/setSelectedUserState',
        payload: null,
      });
    });

    it('should set loading to true before deleting user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      const firstCall = mockDispatch.mock.calls[0][0];
      expect(firstCall).toEqual({ type: 'loading/setLoadingState', payload: true });
    });

    it('should set loading to false after deleting user', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });

    it('should show success alert after delete', () => {
      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'alert/setAlertState',
        payload: {
          show: true,
          type: 'success',
          message: 'User successfully deleted',
        },
      });
    });

    it('should always set loading to false in finally block', () => {
      const mockError = new Error('Delete failed');
      mockDispatch.mockImplementationOnce((action) => {
        if (action.type === 'users/deleteUserState') {
          throw mockError;
        }
      });

      const { result } = renderHook(() => useUsers());

      act(() => {
        result.current.deleteUser(1);
      });

      const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
      expect(lastCall).toEqual({ type: 'loading/setLoadingState', payload: false });
    });
  });
});
