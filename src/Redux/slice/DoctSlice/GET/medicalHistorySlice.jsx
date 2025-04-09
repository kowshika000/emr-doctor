import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchMedicalHistory = createAsyncThunk(
  "emr_doctor/medicalHistory",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_MEDICAL_HISTORY,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const medicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchMedicalHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default medicalHistorySlice.reducer;
