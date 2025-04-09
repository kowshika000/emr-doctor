import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const deleteNurseNote = createAsyncThunk(
  "emr/deleteNurseNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.DELETE_NURSE_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deleteNurseNoteSlice = createSlice({
  name: "nurseNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteNurseNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNurseNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(deleteNurseNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deleteNurseNoteSlice.reducer;
