import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const updateManagementPlan= createAsyncThunk(
  "emr/editManagementPlan",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.EDIT_MANAGEMENT_PLAN,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const editManagementPlanSlice = createSlice({
  name: "ManagementPlan",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateManagementPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManagementPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(updateManagementPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editManagementPlanSlice.reducer;
