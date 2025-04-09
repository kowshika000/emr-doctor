import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchPainRate = createAsyncThunk(
  "emr_doctor/painrate",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_PAINRATE}?appointmentId=${appointmentId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const painRateSlice = createSlice({
  name: "painrate",
  initialState: {
    paindata: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPainRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPainRate.fulfilled, (state, action) => {
        state.loading = false;
        state.paindata = action.payload.data;
      })
      .addCase(fetchPainRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default painRateSlice.reducer;
