import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteProvisionalDiagnosis = createAsyncThunk(
  "emr_doctor/deleteprovisionalDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.DELETE_PROVISIONAL, {
        params: credentials,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteProvisionalDiagnosisSlice = createSlice({
  name: "provisionalDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProvisionalDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProvisionalDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteProvisionalDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteProvisionalDiagnosisSlice.reducer;
