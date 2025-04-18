import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchViewComplaint = createAsyncThunk(
  "emr_doctor/viewComplaint",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.VIEW_CHIEFCOMPLAINT);
      //     `${API_ENDPOINTS.GET_FLUID}?patientId=${patientId}`
      //   );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const viewComplaintSlice = createSlice({
  name: "viewcomplaint",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchViewComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default viewComplaintSlice.reducer;
