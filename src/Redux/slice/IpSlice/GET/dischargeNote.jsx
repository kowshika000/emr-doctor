import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchDischargeNote = createAsyncThunk(
  "emr_doctor/DischargeNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_DISCHARGE_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const dischargeNoteSlice = createSlice({
  name: "DischargeNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDischargeNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDischargeNote.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDischargeNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dischargeNoteSlice.reducer;
