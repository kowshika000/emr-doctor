import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const updateTreatmentPlanNoteNote = createAsyncThunk(
  "emr/editTreatmentPlanNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.EDIT_TREATMENT_PLAN_NOTE,
        null,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const editTreatmentPlanNoteSlice = createSlice({
  name: "TreatmentPlanNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTreatmentPlanNoteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTreatmentPlanNoteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(updateTreatmentPlanNoteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editTreatmentPlanNoteSlice.reducer;
