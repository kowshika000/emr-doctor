import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchSurgeryDiagnosis = createAsyncThunk(
  "emr_doctor/SurgeryDiagnosis",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_SURGERY_DIAGNOSIS,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const surgeryDiagnosisSlice = createSlice({
  name: "SurgeryDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurgeryDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgeryDiagnosis.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSurgeryDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default surgeryDiagnosisSlice.reducer;
