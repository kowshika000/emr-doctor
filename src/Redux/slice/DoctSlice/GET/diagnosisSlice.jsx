import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchDiagnosis = createAsyncThunk(
  "emr_doctor/diagnosis",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_DIAGNOSIS}?appointmentId=${appointmentId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default diagnosisSlice.reducer;
