import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchSurgicalProcedure = createAsyncThunk(
  "emr_doctor/SurgicalProcedure",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GET_SURGICAL_PROCEDURE,
        { params: credentials }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const surgicalProcedureSlice = createSlice({
  name: "SurgicalProcedure",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurgicalProcedure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgicalProcedure.fulfilled, (state, action) => {
        console.log("recived payload", action.payload);

        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSurgicalProcedure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default surgicalProcedureSlice.reducer;
