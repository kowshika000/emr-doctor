import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const bedOccupancy = createAsyncThunk(
  "bed/bedOccupancy",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.BED_OCCUPANCY, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const bedOccupancySlice = createSlice({
  name: "bedOccupancy",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bedOccupancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bedOccupancy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(bedOccupancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bedOccupancySlice.reducer;
