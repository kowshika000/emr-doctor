import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchROS = createAsyncThunk(
  "emr_doctor/ros",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_ROS}?appointmentId=${appointmentId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const rosSlice = createSlice({
  name: "ros",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchROS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchROS.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchROS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rosSlice.reducer;
