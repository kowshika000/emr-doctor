import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const updateConfidentialStatement = createAsyncThunk(
  "emr/editConfidential",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.EDIT_CONFIDENTIAL_STATEMENT,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const editConfidentialSlice = createSlice({
  name: "confidential",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateConfidentialStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfidentialStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(updateConfidentialStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editConfidentialSlice.reducer;
