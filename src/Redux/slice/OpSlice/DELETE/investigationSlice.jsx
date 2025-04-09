import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteInvestigation = createAsyncThunk(
  "emr/deleteInvestigation",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.DELETE_INVESTIGATION,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteInvestigationSlice = createSlice({
  name: "investigation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteInvestigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvestigation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteInvestigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteInvestigationSlice.reducer;
