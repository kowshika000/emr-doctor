import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchFollowUpPlan = createAsyncThunk(
  "emr_doctor/FollowUpPlan",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.GET_FOLLOWUP_PLAN, {
        params: credentials,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const followUpPlanSlice = createSlice({
  name: "FollowUpPlan",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowUpPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowUpPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchFollowUpPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followUpPlanSlice.reducer;
