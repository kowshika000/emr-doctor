import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchProgressNote = createAsyncThunk(
  "emr_doctor/ProgressNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_PROGRESS_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const progressNoteSlice = createSlice({
  name: "ProgressNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressNote.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchProgressNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default progressNoteSlice.reducer;
