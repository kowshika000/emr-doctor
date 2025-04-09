import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchIpPatientDetail = createAsyncThunk(
  "emr_doctor/ipPatientDetail",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_IP_PATIENT_DETAILS,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const ipPatientDetailSlice = createSlice({
  name: "ipPatientDetail",
  initialState: {
    patientData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIpPatientDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIpPatientDetail.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.patientData = action.payload;
      })
      .addCase(fetchIpPatientDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ipPatientDetailSlice.reducer;
