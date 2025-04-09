import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteDiagnosis = createAsyncThunk(
  "emr/deleteDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.DELETE_DIAGNOSIS,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteDiagnosisSlice = createSlice({
  name: "Diagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteDiagnosisSlice.reducer;
