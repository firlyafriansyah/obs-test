import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDataType } from "../../../models/users";

interface UsersState {
  usersState: UserDataType[];
  searchState: string;
  selectedUserState: UserDataType | null;
}

const initialState: UsersState = {
  usersState: [],
  searchState: "",
  selectedUserState: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<UserDataType[]>) => {
      state.usersState = action.payload;
    },
    setSearchState: (state, action: PayloadAction<string>) => {
      state.searchState = action.payload;
    },
    setSelectedUserState: (state, action: PayloadAction<number | null>) => {
      const users = state.usersState.find((user) => user.id === action.payload);
      state.selectedUserState = users || null;
    },
    addUserState: (state, action: PayloadAction<UserDataType>) => {
      state.usersState.push(action.payload);
    },
    editUserState: (state, action: PayloadAction<UserDataType>) => {
      const index = state.usersState.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.usersState[index] = action.payload;
      }
    },
    deleteUserState: (state, action: PayloadAction<number>) => {
      state.usersState = state.usersState.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const filteredUsersState = (state: { users: UsersState }) => {
  const term = state.users.searchState.toLowerCase().trim();

  if (!term) return state.users.usersState;

  return state.users.usersState.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
  );
};

export const totalUsersState = (state: { users: UsersState }) =>
  filteredUsersState(state).length;

export const {
  setUsersState,
  setSearchState,
  setSelectedUserState,
  addUserState,
  editUserState,
  deleteUserState,
} = usersSlice.actions;
export default usersSlice.reducer;
