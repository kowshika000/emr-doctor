import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createTreatment = createAsyncThunk(
  "emr/addTreatment",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_OP_TREATMENT,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addTreatmentSlice = createSlice({
  name: "Treatment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTreatment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addTreatmentSlice.reducer;
