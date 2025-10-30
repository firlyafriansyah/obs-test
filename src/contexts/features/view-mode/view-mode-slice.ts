import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ViewModeDataType } from '../../../models/view-mode';

interface ViewModeState {
  viewModeState: ViewModeDataType;
}

const initialState: ViewModeState = {
  viewModeState: 'grid',
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setViewModeState: (state, action: PayloadAction<ViewModeDataType>) => {
      state.viewModeState = action.payload;
    },
  },
});

export const { setViewModeState } = viewModeSlice.actions;
export default viewModeSlice.reducer;
