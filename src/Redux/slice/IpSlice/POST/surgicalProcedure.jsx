import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createSurgicalProcedure = createAsyncThunk(
  "emr/addSurgicalProcedure",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_SURGICAL_PROCEDURE,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addSurgicalProcedureSlice = createSlice({
  name: "addSurgicalProcedure",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSurgicalProcedure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSurgicalProcedure.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createSurgicalProcedure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addSurgicalProcedureSlice.reducer;
