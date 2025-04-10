import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteSurgicalProcedure = createAsyncThunk(
  "emr/deleteSurgicalProcedure",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.DELETE_SURGICAL_PROCEDURE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteSurgicalProcedureSlice = createSlice({
  name: "deleteSurgicalProcedure",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSurgicalProcedure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSurgicalProcedure.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteSurgicalProcedure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteSurgicalProcedureSlice.reducer;
