import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  alertState: {
    show: boolean;
    type: "success" | "error";
  };
}

const initialState: AlertState = {
  alertState: {
    show: false,
    type: "error",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertState: (
      state,
      action: PayloadAction<{ show: boolean; type: "success" | "error" }>
    ) => {
      state.alertState = action.payload;
    },
  },
});

export const { setAlertState } = alertSlice.actions;
export default alertSlice.reducer;
