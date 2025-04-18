import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchClinicalExamination = createAsyncThunk(
  "emr_doctor/clinicalExam",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_CLINICAL_EXAM}?patientId=${patientId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const clinicalExamSlice = createSlice({
  name: "clinicalExam",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicalExamination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalExamination.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchClinicalExamination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicalExamSlice.reducer;
