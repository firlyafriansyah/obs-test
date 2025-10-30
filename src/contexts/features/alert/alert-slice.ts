import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  alertState: {
    show: boolean;
    type: 'success' | 'error';
    message: string;
  };
}

const initialState: AlertState = {
  alertState: {
    show: false,
    type: 'error',
    message: '',
  },
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertState: (
      state,
      action: PayloadAction<{ show: boolean; type: 'success' | 'error'; message: string }>,
    ) => {
      state.alertState = action.payload;
    },
  },
});

export const { setAlertState } = alertSlice.actions;
export default alertSlice.reducer;
