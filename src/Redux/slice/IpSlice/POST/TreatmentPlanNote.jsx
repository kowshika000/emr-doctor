import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createTreatmentPlanNote = createAsyncThunk(
  "emr/addTreatmentPlanNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_TREATMENT_PLAN_NOTE,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addTreatmentPlanNoteSlice = createSlice({
  name: "TreatmentPlanNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTreatmentPlanNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTreatmentPlanNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createTreatmentPlanNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addTreatmentPlanNoteSlice.reducer;
