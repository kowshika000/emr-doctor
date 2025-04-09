import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteProgressNote = createAsyncThunk(
  "emr/deleteProgressNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.DELETE_PROGRESS_NOTE,
        null,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteProgressNoteSlice = createSlice({
  name: "progress_note",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProgressNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProgressNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteProgressNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteProgressNoteSlice.reducer;
