import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createConsultNote = createAsyncThunk(
  "emr/addConsultNote",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_CONSULTATION_NOTE,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addConsultationSlice = createSlice({
  name: "addconsultion",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConsultNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConsultNote.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createConsultNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addConsultationSlice.reducer;
