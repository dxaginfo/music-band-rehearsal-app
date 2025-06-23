import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandReducer from './slices/bandSlice';
import rehearsalReducer from './slices/rehearsalSlice';
import venueReducer from './slices/venueSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
    venues: venueReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;