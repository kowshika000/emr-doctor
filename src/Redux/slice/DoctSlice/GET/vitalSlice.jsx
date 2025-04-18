import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchVital = createAsyncThunk(
  "emr_doctor/vital",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_VITAL}?patientId=${patientId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const vitalSlice = createSlice({
  name: "vital",
  initialState: {
    vitaldata: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVital.fulfilled, (state, action) => {
        state.loading = false;
        state.vitaldata = action.payload.data;
      })
      .addCase(fetchVital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vitalSlice.reducer;
