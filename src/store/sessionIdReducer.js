import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  sessionId: '',
  statusOfgetSearchId: null,
  errorOfgetSearchId: null,
};

export const getSearchId = createAsyncThunk('sessionId/getSearchId', async function (_, { rejectWithValue }) {
  try {
    const responce = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!responce.ok) {
      throw new Error('server error');
    }
    const id = await responce.json();
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sessionIdReducer = createSlice({
  name: 'sessionId',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.statusOfgetSearchId = 'loading';
        state.errorOfgetSearchId = null;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.sessionId = action.payload;
        state.statusOfgetSearchId = 'resolved';
        state.errorOfgetSearchId = null;
      })
      .addCase(getSearchId.rejected, (state, action) => {
        state.statusOfgetSearchId = 'rejected';
        state.errorOfgetSearchId = action.payload;
      });
  },
});

export default sessionIdReducer.reducer;
