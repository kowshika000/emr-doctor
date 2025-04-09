import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchAddPainrate = createAsyncThunk(
  "emr/addPainrate",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.Add_PAINRATE,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addPainrateSlice = createSlice({
  name: "painrate",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddPainrate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddPainrate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAddPainrate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addPainrateSlice.reducer;
