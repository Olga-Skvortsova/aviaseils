import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterReducer';
import tabsReducer from './tabsReducer';
import sessionIdReducer from './sessionIdReducer';
import getTicketsReducer from './getTicketsReducer';

export const store = configureStore({
  reducer: {
    filterReducer: filterReducer,
    tabsReducer: tabsReducer,
    sessionIdReducer: sessionIdReducer,
    getTicketsReducer: getTicketsReducer,
  },
  devTools: false,
});
