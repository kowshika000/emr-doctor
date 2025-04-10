import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteFinalDiagnosis = createAsyncThunk(
  "emr/deleteFinalDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.DELETE_Final_DIAGNOSIS,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteFinalDiagnosisSlice = createSlice({
  name: "deleteFinalDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFinalDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFinalDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteFinalDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteFinalDiagnosisSlice.reducer;
