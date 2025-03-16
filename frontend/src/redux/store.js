import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import submissionReducer from './slices/submissionSlice';
import aiReducer from './slices/aiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        submissions: submissionReducer,
        ai: aiReducer,
    },
});