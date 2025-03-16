import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import submissionService from '../services/submissionService';

const initialState = {
  submissions: [],
  submission: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const submitCode = createAsyncThunk(
  'submissions/submit',
  async (submissionData, thunkAPI) => {
    try {
      return await submissionService.submitCode(submissionData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubmissions = createAsyncThunk(
  'submissions/getAll',
  async (_, thunkAPI) => {
    try {
      return await submissionService.getSubmissions();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubmissionById = createAsyncThunk(
  'submissions/getById',
  async (id, thunkAPI) => {
    try {
      return await submissionService.getSubmissionById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSubmission = createAsyncThunk(
  'submissions/delete',
  async (id, thunkAPI) => {
    try {
      return await submissionService.deleteSubmission(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const submissionSlice = createSlice({
  name: 'submission',
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
      .addCase(submitCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submission = action.payload.submission;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submissions = action.payload;
      })
      .addCase(getSubmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmissionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submission = action.payload;
      })
      .addCase(getSubmissionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSubmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submissions = state.submissions.filter(
          (submission) => submission._id !== action.payload.id
        );
      })
      .addCase(deleteSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = submissionSlice.actions;
export default submissionSlice.reducer;