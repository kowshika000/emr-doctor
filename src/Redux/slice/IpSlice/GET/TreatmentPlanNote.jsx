import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchTreatmentPlanNote = createAsyncThunk(
  "emr_doctor/TreatmentPlanNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_TREATMENT_PLAN_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const treatmentPlanNoteSlice = createSlice({
  name: "TreatmentPlanNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatmentPlanNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreatmentPlanNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTreatmentPlanNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default treatmentPlanNoteSlice.reducer;
