import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchOpPatientList = createAsyncThunk(
  "emr_doctor/opPatientList",

  async ({ doctorId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_OP_LIST}?doctorId=${doctorId}`
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const opPatientListSlice = createSlice({
  name: "opPatientList",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpPatientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOpPatientList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchOpPatientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default opPatientListSlice.reducer;
