import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchIpPatientList = createAsyncThunk(
  "emr_doctor/ipPatientList",

  async ({ doctorId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_IP_LIST}?doctorId=${doctorId}`
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const ipPatientListSlice = createSlice({
  name: "ipPatientList",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIpPatientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIpPatientList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIpPatientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ipPatientListSlice.reducer;
