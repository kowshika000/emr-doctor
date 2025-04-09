import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createManagementPlan = createAsyncThunk(
  "emr/addManagementPlan",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_MANAGEMENT_PLAN,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addManagementPlanSlice = createSlice({
  name: "managementPlan",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createManagementPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createManagementPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createManagementPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addManagementPlanSlice.reducer;
