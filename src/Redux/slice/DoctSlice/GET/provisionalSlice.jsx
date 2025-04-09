import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchProvisionalDiagnosis = createAsyncThunk(
  "emr_doctor/provisionalDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.GET_PROVISIONAL, {
        params: credentials,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const provisionalDiagnosisSlice = createSlice({
  name: "provisionalDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvisionalDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvisionalDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchProvisionalDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default provisionalDiagnosisSlice.reducer;
