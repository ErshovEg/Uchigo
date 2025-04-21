import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params) => {
    const response = await axios.get('https://api.example.com/employees', { params });
    return response.data;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id) => {
    const response = await axios.get(`https://api.example.com/employees/${id}`);
    return response.data;
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    resetPage: (state) => {
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, ...action.payload];
        state.hasMore = action.payload.length > 0;
        state.page += 1;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedEmployee, resetPage } = employeesSlice.actions;
export default employeesSlice.reducer; 