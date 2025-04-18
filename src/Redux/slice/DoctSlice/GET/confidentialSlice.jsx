import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchConfidentialStatement = createAsyncThunk(
  "emr_doctor/confidentail",
  async ({ patientId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.GET_CONFIDENTIAL_STATEMENT}?patientId=${patientId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const confidentailSlice = createSlice({
  name: "confidentail",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfidentialStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfidentialStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchConfidentialStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default confidentailSlice.reducer;
