import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const updateDischargeNote = createAsyncThunk(
  "emr/editDischargeNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.EDIT_CONSULTATION_NOTE,
        null,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const editDischargeNoteSlice = createSlice({
  name: "dischargeNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDischargeNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDischargeNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(updateDischargeNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editDischargeNoteSlice.reducer;
