import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiService from '../services/aiService';

const initialState = {
  reviewResult: null,
  executionResult: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const reviewCode = createAsyncThunk(
  'ai/review',
  async (submissionId, thunkAPI) => {
    try {
      return await aiService.reviewCode(submissionId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const executeCode = createAsyncThunk(
  'ai/execute',
  async (codeData, thunkAPI) => {
    try {
      return await aiService.executeCode(codeData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reviewCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviewCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviewResult = action.payload;
      })
      .addCase(reviewCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(executeCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.executionResult = action.payload;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = aiSlice.actions;
export default aiSlice.reducer;