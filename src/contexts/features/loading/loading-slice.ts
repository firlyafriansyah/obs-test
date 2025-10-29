import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  loadingState: boolean;
}

const initialState: LoadingState = {
  loadingState: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loadingState = action.payload;
    },
  },
});

export const { setLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;
