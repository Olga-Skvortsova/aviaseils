import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: 'optimal',
};

export const tabsReducer = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    cheapAction: (state) => {
      state.tab = 'cheap';
    },
    fastAction: (state) => {
      state.tab = 'fast';
    },
    optimalAction: (state) => {
      state.tab = 'optimal';
    },
  },
});

export const { cheapAction, fastAction, optimalAction } = tabsReducer.actions;

export default tabsReducer.reducer;
