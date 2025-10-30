import { configureStore } from '@reduxjs/toolkit';
import viewModeReducer from '../features/view-mode/view-mode-slice';
import usersReducer from '../features/users/users-slice';
import loadingReducer from '../features/loading/loading-slice';
import alertReducer from '../features/alert/alert-slice';

export const store = configureStore({
  reducer: {
    viewMode: viewModeReducer,
    users: usersReducer,
    loading: loadingReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
