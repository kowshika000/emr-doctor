import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createClinicalExamination = createAsyncThunk(
  "emr/addClinicalExam",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_CLINICAL_EXAM,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addClinicalExamSlice = createSlice({
  name: "clinical",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClinicalExamination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClinicalExamination.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createClinicalExamination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addClinicalExamSlice.reducer;
