import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteConsultNote = createAsyncThunk(
  "emr/deleteConsultNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.DELETE_CONSULTATION_NOTE,null,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteConsultNoteSlice = createSlice({
  name: "consultation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteConsultNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConsultNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteConsultNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteConsultNoteSlice.reducer;
