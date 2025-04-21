import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import themeReducer from './slices/themeSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    theme: themeReducer,
    filters: filtersReducer,
  },
}); 