import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createDiagnosis = createAsyncThunk(
  "emr/addDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_DIAGNOSIS,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addDiagnosisSlice = createSlice({
  name: "Diagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addDiagnosisSlice.reducer;
