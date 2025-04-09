import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchOpPatientDetail = createAsyncThunk(
  "emr_doctor/opPatientDetail",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_OP_PATIENT_DETAILS,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const opPatientDetailSlice = createSlice({
  name: "opPatientDetail",
  initialState: {
    patientData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpPatientDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpPatientDetail.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.patientData = action.payload.data;
      })
      .addCase(fetchOpPatientDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default opPatientDetailSlice.reducer;
