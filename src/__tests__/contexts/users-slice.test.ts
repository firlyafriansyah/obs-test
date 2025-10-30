import { beforeEach, describe, expect, it } from 'vitest';
import usersReducer, {
  addUserState,
  deleteUserState,
  editUserState,
  filteredUsersState,
  setSearchState,
  setSelectedUserState,
  setUsersState,
  totalUsersState,
} from '../../contexts/features/users/users-slice';
import type { UserDataType } from '../../models/users';

describe('usersSlice', () => {
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
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: 'Second St',
        suite: 'Suite 2',
        city: 'Los Angeles',
        zipcode: '90001',
        geo: { lat: '34.0522', lng: '-118.2437' },
      },
      phone: '098-765-4321',
      website: 'janesmith.com',
      company: {
        name: 'Smith Corp',
        catchPhrase: 'Innovation first',
        bs: 'tech solutions',
      },
    },
    {
      id: 3,
      name: 'Alice Johnson',
      username: 'alicej',
      email: 'alice@example.com',
      address: {
        street: 'Third Ave',
        suite: 'Unit 3',
        city: 'Chicago',
        zipcode: '60601',
        geo: { lat: '41.8781', lng: '-87.6298' },
      },
      phone: '555-123-4567',
      website: 'alice.com',
      company: {
        name: 'Johnson Ltd',
        catchPhrase: 'Quality first',
        bs: 'consulting services',
      },
    },
  ];

  const initialState: {
    usersState: UserDataType[];
    searchState: string;
    selectedUserState: UserDataType | null;
  } = {
    usersState: [],
    searchState: '',
    selectedUserState: null,
  };

  describe('setUsersState', () => {
    it('should set users array', () => {
      const state = usersReducer(initialState, setUsersState(mockUsers));
      expect(state.usersState).toEqual(mockUsers);
      expect(state.usersState).toHaveLength(3);
    });

    it('should replace existing users array', () => {
      const existingState = {
        ...initialState,
        usersState: [mockUsers[0]],
      };
      const state = usersReducer(existingState, setUsersState(mockUsers));
      expect(state.usersState).toEqual(mockUsers);
      expect(state.usersState).toHaveLength(3);
    });

    it('should set empty array', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, setUsersState([]));
      expect(state.usersState).toEqual([]);
      expect(state.usersState).toHaveLength(0);
    });
  });

  describe('setSearchState', () => {
    it('should set search string', () => {
      const state = usersReducer(initialState, setSearchState('john'));
      expect(state.searchState).toBe('john');
    });

    it('should update existing search string', () => {
      const existingState = {
        ...initialState,
        searchState: 'old search',
      };
      const state = usersReducer(existingState, setSearchState('new search'));
      expect(state.searchState).toBe('new search');
    });

    it('should set empty search string', () => {
      const existingState = {
        ...initialState,
        searchState: 'search term',
      };
      const state = usersReducer(existingState, setSearchState(''));
      expect(state.searchState).toBe('');
    });

    it('should handle search string with spaces', () => {
      const state = usersReducer(initialState, setSearchState('  john doe  '));
      expect(state.searchState).toBe('  john doe  ');
    });
  });

  describe('setSelectedUserState', () => {
    beforeEach(() => {
      initialState.usersState = mockUsers;
    });

    it('should set selected user by id', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, setSelectedUserState(1));
      expect(state.selectedUserState).toEqual(mockUsers[0]);
    });

    it('should update selected user to different user', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
        selectedUserState: mockUsers[0],
      };
      const state = usersReducer(existingState, setSelectedUserState(2));
      expect(state.selectedUserState).toEqual(mockUsers[1]);
    });

    it('should set selected user to null when id not found', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, setSelectedUserState(999));
      expect(state.selectedUserState).toBeNull();
    });

    it('should set selected user to null when passing null', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
        selectedUserState: mockUsers[0],
      };
      const state = usersReducer(existingState, setSelectedUserState(null));
      expect(state.selectedUserState).toBeNull();
    });

    it('should handle empty users array', () => {
      const existingState = {
        ...initialState,
        usersState: [],
      };
      const state = usersReducer(existingState, setSelectedUserState(1));
      expect(state.selectedUserState).toBeNull();
    });
  });

  describe('addUserState', () => {
    it('should add new user to existing array', () => {
      const existingState = {
        ...initialState,
        usersState: [mockUsers[0]],
      };
      const state = usersReducer(existingState, addUserState(mockUsers[1]));
      expect(state.usersState).toHaveLength(2);
      expect(state.usersState[1]).toEqual(mockUsers[1]);
    });

    it('should add user at the end of array', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers.slice(0, 2),
      };
      const state = usersReducer(existingState, addUserState(mockUsers[2]));
      expect(state.usersState).toHaveLength(3);
      expect(state.usersState[2]).toEqual(mockUsers[2]);
    });

    it('should not affect other users when adding', () => {
      const existingState = {
        ...initialState,
        usersState: [mockUsers[0]],
      };
      const state = usersReducer(existingState, addUserState(mockUsers[1]));
      expect(state.usersState[0]).toEqual(mockUsers[0]);
      expect(state.usersState[1]).toEqual(mockUsers[1]);
    });
  });

  describe('editUserState', () => {
    it('should update existing user', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const updatedUser = { ...mockUsers[0], name: 'John Updated' };
      const state = usersReducer(existingState, editUserState(updatedUser));
      expect(state.usersState[0].name).toBe('John Updated');
      expect(state.usersState[0].id).toBe(1);
    });

    it('should not modify other users when editing', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const updatedUser = { ...mockUsers[1], name: 'Jane Updated' };
      const state = usersReducer(existingState, editUserState(updatedUser));
      expect(state.usersState[0]).toEqual(mockUsers[0]);
      expect(state.usersState[1].name).toBe('Jane Updated');
      expect(state.usersState[2]).toEqual(mockUsers[2]);
    });

    it('should not change array when user id not found', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const nonExistentUser = { ...mockUsers[0], id: 999, name: 'Non Existent' };
      const state = usersReducer(existingState, editUserState(nonExistentUser));
      expect(state.usersState).toEqual(mockUsers);
    });

    it('should update all user properties', () => {
      const existingState = {
        ...initialState,
        usersState: [mockUsers[0]],
      };
      const updatedUser = {
        ...mockUsers[0],
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '999-999-9999',
      };
      const state = usersReducer(existingState, editUserState(updatedUser));
      expect(state.usersState[0]).toEqual(updatedUser);
    });

    it('should maintain array length when editing', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const updatedUser = { ...mockUsers[1], name: 'Jane Updated' };
      const state = usersReducer(existingState, editUserState(updatedUser));
      expect(state.usersState).toHaveLength(3);
    });
  });

  describe('deleteUserState', () => {
    it('should delete user by id', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, deleteUserState(1));
      expect(state.usersState).toHaveLength(2);
      expect(state.usersState.find((user) => user.id === 1)).toBeUndefined();
    });

    it('should delete correct user and keep others', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, deleteUserState(2));
      expect(state.usersState).toHaveLength(2);
      expect(state.usersState[0]).toEqual(mockUsers[0]);
      expect(state.usersState[1]).toEqual(mockUsers[2]);
    });

    it('should not change array when id not found', () => {
      const existingState = {
        ...initialState,
        usersState: mockUsers,
      };
      const state = usersReducer(existingState, deleteUserState(999));
      expect(state.usersState).toEqual(mockUsers);
      expect(state.usersState).toHaveLength(3);
    });

    it('should result in empty array when deleting last user', () => {
      const existingState = {
        ...initialState,
        usersState: [mockUsers[0]],
      };
      const state = usersReducer(existingState, deleteUserState(1));
      expect(state.usersState).toEqual([]);
      expect(state.usersState).toHaveLength(0);
    });
  });

  describe('filteredUsersState selector', () => {
    const createState = (users: UserDataType[], search: string) => ({
      users: {
        usersState: users,
        searchState: search,
        selectedUserState: null,
      },
    });

    it('should return all users when search is empty', () => {
      const state = createState(mockUsers, '');
      const filtered = filteredUsersState(state);
      expect(filtered).toEqual(mockUsers);
      expect(filtered).toHaveLength(3);
    });

    it('should filter users by name', () => {
      const state = createState(mockUsers, 'john');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].name).toBe('John Doe');
      expect(filtered[1].name).toBe('Alice Johnson');
    });

    it('should filter users by username', () => {
      const state = createState(mockUsers, 'jane');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].username).toBe('janesmith');
    });

    it('should be case insensitive', () => {
      const state = createState(mockUsers, 'JOHN');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(2);
    });

    it('should trim whitespace from search term', () => {
      const state = createState(mockUsers, '  jane  ');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].username).toBe('janesmith');
    });

    it('should return empty array when no matches', () => {
      const state = createState(mockUsers, 'nonexistent');
      const filtered = filteredUsersState(state);
      expect(filtered).toEqual([]);
      expect(filtered).toHaveLength(0);
    });

    it('should filter partial matches in name', () => {
      const state = createState(mockUsers, 'doe');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('John Doe');
    });

    it('should filter partial matches in username', () => {
      const state = createState(mockUsers, 'smith');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].username).toBe('janesmith');
    });

    it('should return empty array when users array is empty', () => {
      const state = createState([], 'john');
      const filtered = filteredUsersState(state);
      expect(filtered).toEqual([]);
    });

    it('should match users by name OR username', () => {
      const state = createState(mockUsers, 'j');
      const filtered = filteredUsersState(state);
      expect(filtered).toHaveLength(3);
    });
  });

  describe('totalUsersState selector', () => {
    const createState = (users: UserDataType[], search: string) => ({
      users: {
        usersState: users,
        searchState: search,
        selectedUserState: null,
      },
    });

    it('should return total count when no search', () => {
      const state = createState(mockUsers, '');
      const total = totalUsersState(state);
      expect(total).toBe(3);
    });

    it('should return filtered count when searching', () => {
      const state = createState(mockUsers, 'john');
      const total = totalUsersState(state);
      expect(total).toBe(2);
    });

    it('should return 0 when no matches', () => {
      const state = createState(mockUsers, 'nonexistent');
      const total = totalUsersState(state);
      expect(total).toBe(0);
    });

    it('should return 0 when users array is empty', () => {
      const state = createState([], 'john');
      const total = totalUsersState(state);
      expect(total).toBe(0);
    });

    it('should update count based on search term', () => {
      const state1 = createState(mockUsers, 'jane');
      expect(totalUsersState(state1)).toBe(1);

      const state2 = createState(mockUsers, 'j');
      expect(totalUsersState(state2)).toBe(3);

      const state3 = createState(mockUsers, '');
      expect(totalUsersState(state3)).toBe(3);
    });
  });
});
