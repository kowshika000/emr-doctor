import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchPreOprNote = createAsyncThunk(
  "emr_doctor/preOprNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_PRE_OPR_NOTE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const preOprNoteSlice = createSlice({
  name: "preOprNote",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreOprNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreOprNote.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchPreOprNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default preOprNoteSlice.reducer;
