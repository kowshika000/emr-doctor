import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchInvestigation = createAsyncThunk(
  "emr_doctor/investigation",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.GET_INVESTIGATION, {
        params: credentials,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const investigationSlice = createSlice({
  name: "investigation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInvestigation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchInvestigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investigationSlice.reducer;
