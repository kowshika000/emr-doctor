import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchConsultNote = createAsyncThunk(
  "emr_doctor/consultNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_CONSULTATION_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const consultNoteSlice = createSlice({
  name: "consultNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultNote.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchConsultNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default consultNoteSlice.reducer;
