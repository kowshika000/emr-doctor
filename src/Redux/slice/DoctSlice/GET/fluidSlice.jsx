import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchFluid = createAsyncThunk(
  "emr_doctor/fluid",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_FLUID}?patientId=${patientId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const fluidSlice = createSlice({
  name: "fluid",
  initialState: {
    fluiddata: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFluid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFluid.fulfilled, (state, action) => {
        state.loading = false;
        state.fluiddata = action.payload.data;
      })
      .addCase(fetchFluid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fluidSlice.reducer;
