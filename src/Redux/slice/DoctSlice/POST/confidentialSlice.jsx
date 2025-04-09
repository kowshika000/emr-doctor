import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createConfidentialStatement = createAsyncThunk(
  "emr/addConfidential",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_CONFIDENTIAL_STATEMENT,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addConfidentialSlice = createSlice({
  name: "confidential",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConfidentialStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConfidentialStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createConfidentialStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addConfidentialSlice.reducer;
