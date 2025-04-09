import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const updateClinicalExamination = createAsyncThunk(
  "emr/editClinicalExam",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.EDIT_CLINICAL_EXAM,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const editClinicalExamSlice = createSlice({
  name: "clinical",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateClinicalExamination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClinicalExamination.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(updateClinicalExamination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editClinicalExamSlice.reducer;
