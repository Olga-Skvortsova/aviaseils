import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: [4, 0, 1, 2, 3],
};

export const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    allFilterAction: (state) => {
      if (state.filter.includes(4)) {
        state.filter = [];
      } else {
        state.filter = [4, 0, 1, 2, 3];
      }
    },
    withoutTransferFilterAction: (state) => {
      if (state.filter.includes(0)) {
        state.filter = state.filter.filter((el) => el !== 0 && el !== 4);
      } else {
        const newFilter = state.filter.length === 3 ? [...state.filter, 0, 4] : [...state.filter, 0];
        state.filter = newFilter;
      }
    },
    oneTransferFilterAction: (state) => {
      if (state.filter.includes(1)) {
        state.filter = state.filter.filter((el) => el !== 1 && el !== 4);
      } else {
        const newFilter = state.filter.length === 3 ? [...state.filter, 1, 4] : [...state.filter, 1];
        state.filter = newFilter;
      }
    },
    twoTransferFilterAction: (state) => {
      if (state.filter.includes(2)) {
        state.filter = state.filter.filter((el) => el !== 2 && el !== 4);
      } else {
        const newFilter = state.filter.length === 3 ? [...state.filter, 2, 4] : [...state.filter, 2];
        state.filter = newFilter;
      }
    },
    threeTransferFilterAction: (state) => {
      if (state.filter.includes(3)) {
        state.filter = state.filter.filter((el) => el !== 3 && el !== 4);
      } else {
        const newFilter = state.filter.length === 3 ? [...state.filter, 3, 4] : [...state.filter, 3];
        state.filter = newFilter;
      }
    },
  },
});

export const {
  allFilterAction,
  withoutTransferFilterAction,
  oneTransferFilterAction,
  twoTransferFilterAction,
  threeTransferFilterAction,
} = filterReducer.actions;

export default filterReducer.reducer;
