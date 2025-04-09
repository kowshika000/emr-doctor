import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchManagementPlan = createAsyncThunk(
  "emr_doctor/managementPlan",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_MANAGEMENT_PLAN}?appointmentId=${appointmentId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const managementPlanSlice = createSlice({
  name: "managementPlan",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagementPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagementPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchManagementPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managementPlanSlice.reducer;
