import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  gender: '',
  technologies: [],
  position: '',
  activeFilter: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setTechnologies: (state, action) => {
      state.technologies = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.gender = '';
      state.technologies = [];
      state.position = '';
      state.activeFilter = null;
    },
  },
});

export const {
  setSearchQuery,
  setGender,
  setTechnologies,
  setPosition,
  setActiveFilter,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer; 