import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchAddFluid = createAsyncThunk(
  "emr/addFluid",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.Add_FLUID,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addFluidSlice = createSlice({
  name: "fluid",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddFluid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddFluid.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAddFluid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addFluidSlice.reducer;
