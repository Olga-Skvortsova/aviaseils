import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  tickets: [],
  filtredTickets: [],
  statusOfgetTickets: null,
  errorOfgetTickets: null,
};

export const getTickets = createAsyncThunk('tickets/getTickets', async function ({ sessionId }, { rejectWithValue }) {
  try {
    const responce = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${sessionId.searchId}`);
    if (!responce.ok) {
      throw new Error('server error');
    }
    const tickets = await responce.json();
    return tickets;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getTicketsReducer = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    newTicketsAction: (state, action) => {
      state.filtredTickets = action.payload;
    },
    filtredTicketsAction: (state, action) => {
      const ticketsWithFilter = [];
      action.payload.tickets.forEach((ticets) => {
        action.payload.filter.forEach((filter) => {
          if (ticets.segments[0].stops.length === filter) {
            ticketsWithFilter.push(ticets);
          }
        });
      });
      state.filtredTickets = ticketsWithFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.statusOfgetTickets = 'loading';
        state.errorOfgetTickets = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets.push(...action.payload.tickets);
        state.filtredTickets.push(...action.payload.tickets);
        state.statusOfgetTickets = 'resolved';
        state.errorOfgetTickets = null;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.statusOfgetTickets = 'rejected';
        state.errorOfgetTickets = action.payload;
      });
  },
});

export const { addTickets, newTicketsAction, filtredTicketsAction } = getTicketsReducer.actions;

export default getTicketsReducer.reducer;
