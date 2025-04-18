import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchChiefComplaint = createAsyncThunk(
  "emr_doctor/chiefComplaint",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_CHIEFCOMPLAINT}?patientId=${patientId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const cheifComplaintSlice = createSlice({
  name: "chiefComplaint",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChiefComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChiefComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchChiefComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cheifComplaintSlice.reducer;
